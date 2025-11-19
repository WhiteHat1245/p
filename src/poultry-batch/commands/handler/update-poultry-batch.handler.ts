import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePoultryBatchCommand } from "../impl/update-poultry-batch.command";
import { InjectRepository } from "@nestjs/typeorm";
import { PoultryBatch } from "src/Core Models/PoultryBatch";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdatePoultryBatchCommand)
export class UpdatePoultryBatchHandler implements ICommandHandler<UpdatePoultryBatchCommand> {
  constructor(@InjectRepository(PoultryBatch) private readonly repository: Repository<PoultryBatch>) {}
  async execute(command: UpdatePoultryBatchCommand): Promise<PoultryBatch> {
    const entry = await this.repository.preload({
      BatchID: command.id,
      ...command.updatePoultryBatchDto,
    });
    if (!entry) {
      throw new NotFoundException(`Poultry Batch with ID ${command.id} not found.`);
    }
    return this.repository.save(entry);
  }
}