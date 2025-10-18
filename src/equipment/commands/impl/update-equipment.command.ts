import { UpdateEquipmentDto } from '../../dto/update-equipment.dto';

export class UpdateEquipmentCommand {
  constructor(
    public readonly equipmentId: number,
    public readonly updateEquipmentDto: UpdateEquipmentDto,
  ) {}
}
