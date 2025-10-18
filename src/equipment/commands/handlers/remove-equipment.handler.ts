// src/equipment/commands/handlers/remove-equipment.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveEquipmentCommand } from '../impl/remove-equipment.command';
import { Equipment } from 'src/Core Models/Equipment';

@CommandHandler(RemoveEquipmentCommand)
export class RemoveEquipmentHandler
  implements ICommandHandler<RemoveEquipmentCommand>
{
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async execute(command: RemoveEquipmentCommand): Promise<void> {
    const { equipmentId } = command;
    const result = await this.equipmentRepository.delete(equipmentId);
    if (result.affected === 0) {
      throw new NotFoundException(`Equipment with ID ${equipmentId} not found`);
    }
  }
}
