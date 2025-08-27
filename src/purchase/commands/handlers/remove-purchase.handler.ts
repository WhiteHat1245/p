// src/purchase/commands/handlers/remove-purchase.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemovePurchaseCommand } from '../impl/remove-purchase.command';
import { Purchase } from 'src/Core Models/Purchase ';

@CommandHandler(RemovePurchaseCommand)
export class RemovePurchaseHandler implements ICommandHandler<RemovePurchaseCommand> {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async execute(command: RemovePurchaseCommand): Promise<void> {
    const { id } = command;
    const result = await this.purchaseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }
  }
}