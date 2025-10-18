import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEquipmentCommand } from '../create-equipment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from 'src/Core Models/Equipment';
import { Repository } from 'typeorm';

@CommandHandler(CreateEquipmentCommand)
export class CreateEquipmentHandler
  implements ICommandHandler<CreateEquipmentCommand>
{
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async execute(command: CreateEquipmentCommand): Promise<Equipment> {
    const newEquipment = this.equipmentRepository.create(
      command.createEquipmentDto,
    );
    return this.equipmentRepository.save(newEquipment);
  }
}
