// src/supplier/commands/handlers/remove-supplier.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveSupplierCommand } from '../impl/remove-supplier.command';
import { Supplier } from 'src/Core Models/Supplier';

@CommandHandler(RemoveSupplierCommand)
export class RemoveSupplierHandler implements ICommandHandler<RemoveSupplierCommand> {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async execute(command: RemoveSupplierCommand): Promise<void> {
    const { id } = command;
    const result = await this.supplierRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
  }
}