import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource, Repository } from 'typeorm';
import { CreateSaleCommand } from '../impl/create-sale.command';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Sale } from 'src/Core Models/Sale ';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';

@CommandHandler(CreateSaleCommand)
export class CreateSaleHandler implements ICommandHandler<CreateSaleCommand> {
  constructor(private dataSource: DataSource) {}

  async execute(command: CreateSaleCommand): Promise<Sale> {
    const { createSaleDto } = command;

    return this.dataSource.transaction(async (manager) => {
      // 1. حساب الإجمالي
      const totalAmount = createSaleDto.saleDetails.reduce(
        (sum, detail) => sum + detail.quantity * detail.unitPrice,
        0,
      );

      // 2. تحديث المخزون لكل عنصر في المبيعات
      const inventoryRepository = manager.getRepository(FrozenPoultryInventory);

      for (const detail of createSaleDto.saleDetails) {
        const inventoryItem = await inventoryRepository.findOne({
          where: { PoultryTypeID: detail.itemID },
        });

        if (!inventoryItem) {
          throw new NotFoundException(
            `Item with ID ${detail.itemID} not found in inventory.`,
          );
        }

        if (inventoryItem.Quantity < detail.quantity) {
          throw new BadRequestException(
            `Insufficient stock for item with ID ${detail.itemID}.`,
          );
        }

        inventoryItem.Quantity -= detail.quantity;
        await inventoryRepository.save(inventoryItem);
      }

      // 3. إنشاء سجل المبيعات
      const sale = manager.create(Sale, {
        ...createSaleDto,
        TotalAmount: totalAmount,
      });

      const savedSale = await manager.save(sale);

      // 4. إنشاء تفاصيل المبيعات
      const saleDetails = createSaleDto.saleDetails.map((detail) =>
        manager.create(saleDetails, {
          ...detail,
          SaleID: savedSale.SaleID,
        }),
      );
      await manager.save(saleDetails);

      return savedSale;
    });
  }
}
