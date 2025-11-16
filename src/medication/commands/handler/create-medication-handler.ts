import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMedicationCommand } from "../Impl/create-medication.command";
import { Medication } from "src/Core Models/Medication";
import { Repository } from "typeorm";

@CommandHandler(CreateMedicationCommand)
export class CreateMedicationHandler implements ICommandHandler<CreateMedicationCommand> {
  constructor(@InjectRepository(Medication) private readonly repository: Repository<Medication>) {}
  async execute(command: CreateMedicationCommand): Promise<Medication> { // Fix: The return type should be Medication, not Medication[]
    const newMedication = this.repository.create(command.createMedicationDto as Partial<Medication>);
    return this.repository.save(newMedication);
  }
}