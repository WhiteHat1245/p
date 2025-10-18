import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteEquipmentCommand } from "../delete-equipment.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Equipment } from "src/Core Models/Equipment";
import { Repository } from "typeorm";

@CommandHandler(DeleteEquipmentCommand)
export class DeleteEquipmentHandler implements ICommandHandler<DeleteEquipmentCommand> {

    constructor(
        @InjectRepository(Equipment)
        private readonly equipmentRepository: Repository<Equipment>,
    ) { }

    async execute(command: DeleteEquipmentCommand): Promise<any> {
        await this.equipmentRepository.delete(command.id);
        return { success: true, message: 'Equipment deleted successfully.' };
    }
}