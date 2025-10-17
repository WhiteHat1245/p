// src/purchase/commands/handlers/update-purchase.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdatePurchaseCommand } from '../impl/update-purchase.command';
import { Purchase } from 'src/Core Models/Purchase ';

@CommandHandler(UpdatePurchaseCommand)
export class UpdatePurchaseHandler
  implements ICommandHandler<UpdatePurchaseCommand>
{
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async execute(command: UpdatePurchaseCommand): Promise<Purchase> {
    const { id, updatePurchaseDto } = command;
    const purchase = await this.purchaseRepository.preload({
      PurchaseID: id,
      ...updatePurchaseDto,
    });
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }
    return this.purchaseRepository.save(purchase);
  }
}
