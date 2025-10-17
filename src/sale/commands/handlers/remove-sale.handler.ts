// src/sale/commands/handlers/remove-sale.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveSaleCommand } from '../impl/remove-sale.command';
import { Sale } from 'src/Core Models/Sale ';

@CommandHandler(RemoveSaleCommand)
export class RemoveSaleHandler implements ICommandHandler<RemoveSaleCommand> {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async execute(command: RemoveSaleCommand): Promise<void> {
    const { id } = command;
    const result = await this.saleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
  }
}
