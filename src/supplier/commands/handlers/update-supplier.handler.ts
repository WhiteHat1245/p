// src/supplier/commands/handlers/update-supplier.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateSupplierCommand } from '../impl/update-supplier.command';
import { Supplier } from 'src/Core Models/Supplier';

@CommandHandler(UpdateSupplierCommand)
export class UpdateSupplierHandler
  implements ICommandHandler<UpdateSupplierCommand>
{
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async execute(command: UpdateSupplierCommand): Promise<Supplier> {
    const { id, updateSupplierDto } = command;
    const supplier = await this.supplierRepository.preload({
      SupplierID: id,
      ...updateSupplierDto,
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return this.supplierRepository.save(supplier);
  }
}
