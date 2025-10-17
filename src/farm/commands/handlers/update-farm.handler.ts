// src/farm/commands/handlers/update-farm.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateFarmCommand } from '../impl/update-farm.command';
import { Farm } from 'src/Core Models/Farm';

@CommandHandler(UpdateFarmCommand)
export class UpdateFarmHandler implements ICommandHandler<UpdateFarmCommand> {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async execute(command: UpdateFarmCommand): Promise<Farm> {
    const { id, updateFarmDto } = command;
    const farm = await this.farmRepository.preload({
      FarmID: id,
      ...updateFarmDto,
    });
    if (!farm) {
      throw new NotFoundException(`Farm with ID ${id} not found`);
    }
    return this.farmRepository.save(farm);
  }
}
