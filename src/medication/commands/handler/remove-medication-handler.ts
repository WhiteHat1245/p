import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RemoveMedicationCommand } from "../Impl/remove-medication.command";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { Medication } from "src/Core Models/Medication";
import { Repository } from "typeorm";

@CommandHandler(RemoveMedicationCommand)
export class RemoveMedicationHandler implements ICommandHandler<RemoveMedicationCommand> {
  constructor(@InjectRepository(Medication) private readonly repository: Repository<Medication>) {}
  async execute(command: RemoveMedicationCommand): Promise<void> {
    const result = await this.repository.delete(command.id);
    if (result.affected === 0) {
      throw new NotFoundException(`Medication with ID ${command.id} not found.`);
    }
  }
}