import { CreateEquipmentDto } from '../../dto/create-equipment.dto';

export class CreateEquipmentCommand {
  constructor(public readonly createEquipmentDto: CreateEquipmentDto) {}
}
