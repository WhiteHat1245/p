// src/supplier/commands/handlers/create-supplier.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierCommand } from '../impl/create-supplier.command';
import { Supplier } from 'src/Core Models/Supplier';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler implements ICommandHandler<CreateSupplierCommand> {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async execute(command: CreateSupplierCommand): Promise<Supplier> {
    const { createSupplierDto } = command;
    const supplier = this.supplierRepository.create(createSupplierDto as Partial<Supplier>);
    return this.supplierRepository.save(supplier);
  }
}