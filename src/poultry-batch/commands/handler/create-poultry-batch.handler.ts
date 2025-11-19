import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { PoultryBatch } from "src/Core Models/PoultryBatch";
import { Repository } from "typeorm";
import { CreatePoultryBatchCommand } from "../impl/create-poultry-batch.command";

// --- Handlers ---
@CommandHandler(CreatePoultryBatchCommand)
export class CreatePoultryBatchHandler implements ICommandHandler<CreatePoultryBatchCommand> {
 constructor(@InjectRepository(PoultryBatch) private readonly repository: Repository<PoultryBatch>) {}
 async execute(command: CreatePoultryBatchCommand): Promise<PoultryBatch[]> {
 const newEntry = this.repository.create(command.createPoultryBatchDto as any);
 return this.repository.save(newEntry as any);
 }
}