// src/sale/commands/handlers/update-sale.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateSaleCommand } from '../impl/update-sale.command';
import { Sale } from 'src/Core Models/Sale ';


@CommandHandler(UpdateSaleCommand)
export class UpdateSaleHandler implements ICommandHandler<UpdateSaleCommand> {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async execute(command: UpdateSaleCommand): Promise<Sale> {
    const { id, updateSaleDto } = command;
    const sale = await this.saleRepository.preload({ SaleID: id, ...updateSaleDto });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return this.saleRepository.save(sale);
  }
}