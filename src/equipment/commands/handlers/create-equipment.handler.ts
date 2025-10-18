// src/equipment/commands/handlers/create-equipment.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentCommand } from '../impl/create-equipment.command';
import { Equipment } from 'src/Core Models/Equipment';

@CommandHandler(CreateEquipmentCommand)
export class CreateEquipmentHandler
  implements ICommandHandler<CreateEquipmentCommand>
{
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async execute(command: CreateEquipmentCommand): Promise<Equipment> {
    const { createEquipmentDto } = command;
    const equipment = this.equipmentRepository.create(createEquipmentDto);
    return this.equipmentRepository.save(equipment);
  }
}
