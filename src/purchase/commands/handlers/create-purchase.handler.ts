// src/purchase/commands/handlers/create-purchase.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { CreatePurchaseCommand } from '../impl/create-purchase.command';
import { Purchase } from 'src/Core Models/Purchase ';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';

@CommandHandler(CreatePurchaseCommand)
export class CreatePurchaseHandler implements ICommandHandler<CreatePurchaseCommand> {
  constructor(private dataSource: DataSource) {}

  async execute(command: CreatePurchaseCommand): Promise<Purchase> {
    const { createPurchaseDto } = command;

    return this.dataSource.transaction(async (manager) => {
      // 1. حساب إجمالي التكلفة
      const totalCost = createPurchaseDto.purchaseDetails.reduce(
        (sum, detail) => sum + detail.quantity * detail.unitCost,
        0,
      );

      // 2. تحديث المخزون لكل عنصر تم شراؤه
      const inventoryRepository = manager.getRepository(FrozenPoultryInventory);

      for (const detail of createPurchaseDto.purchaseDetails) {
        let inventoryItem = await inventoryRepository.findOne({ where: { PoultryTypeID: detail.itemID } });

        if (!inventoryItem) {
          // إذا لم يكن العنصر موجودًا، قم بإنشاء سجل مخزون جديد
          inventoryItem = inventoryRepository.create({
            PoultryTypeID: detail.itemID,
            Quantity: detail.quantity,
            Weight: 0, // يجب توفير هذه القيمة
            FreezeDate: new Date(),
          });
        } else {
          // إذا كان موجودًا، قم بتحديث الكمية
          inventoryItem.Quantity += detail.quantity;
        }

        await inventoryRepository.save(inventoryItem);
      }

      // 3. إنشاء سجل الشراء
      const purchase = manager.create(Purchase, {
        ...createPurchaseDto,
        TotalCost: totalCost,
      });

      const savedPurchase = await manager.save(purchase);

      // 4. إنشاء تفاصيل الشراء
      const purchaseDetails = createPurchaseDto.purchaseDetails.map((detail) =>
        manager.create(purchaseDetails, {
          ...detail,
          PurchaseID: savedPurchase.PurchaseID,
        }),
      );
      await manager.save(purchaseDetails);

      return savedPurchase;
    });
  }
}