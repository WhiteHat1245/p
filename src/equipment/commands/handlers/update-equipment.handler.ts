import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateEquipmentCommand } from "../update-equipment.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Equipment } from "src/Core Models/Equipment";
import { Repository } from "typeorm";

@CommandHandler(UpdateEquipmentCommand)
export class UpdateEquipmentHandler implements ICommandHandler<UpdateEquipmentCommand> {

    constructor(
        @InjectRepository(Equipment)
        private readonly equipmentRepository: Repository<Equipment>,
    ) { }

    async execute(command: UpdateEquipmentCommand): Promise<any> {
        await this.equipmentRepository.update(command.id, command.updateEquipmentDto);
        return { success: true, message: 'Equipment updated successfully.' };
    }
}