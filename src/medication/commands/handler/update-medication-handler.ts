import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateMedicationCommand } from "../Impl/update-medication.command";
import { Medication } from "src/Core Models/Medication";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";


@CommandHandler(UpdateMedicationCommand)
export class UpdateMedicationHandler implements ICommandHandler<UpdateMedicationCommand> {
  constructor(@InjectRepository(Medication) private readonly repository: Repository<Medication>) {}
  async execute(command: UpdateMedicationCommand): Promise<Medication> {
    const medication = await this.repository.preload({
      MedicationID: Number(command.id),
      ...command.updateMedicationDto,
    });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${command.id} not found.`);
    }
    return this.repository.save(medication);
  }
}