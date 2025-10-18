import { UpdateEquipmentDto } from "../../dto/update-equipment.dto";

export class UpdateEquipmentCommand {
    constructor(
        public readonly id: number,
        public readonly updateEquipmentDto: UpdateEquipmentDto
    ) {}
}
