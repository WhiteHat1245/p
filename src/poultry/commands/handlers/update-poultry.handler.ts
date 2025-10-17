// src/poultry/commands/handlers/update-poultry.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdatePoultryCommand } from '../impl/update-poultry.command.js';
import { Poultry } from '../../../Core Models/Poultry';

@CommandHandler(UpdatePoultryCommand)
export class UpdatePoultryHandler
  implements ICommandHandler<UpdatePoultryCommand>
{
  constructor(
    @InjectRepository(Poultry)
    private readonly poultryRepository: Repository<Poultry>,
  ) {}

  async execute(command: UpdatePoultryCommand): Promise<Poultry> {
    const { id, updatePoultryDto } = command;
    const poultry = await this.poultryRepository.preload({
      PoultryID: id,
      ...updatePoultryDto,
    });
    if (!poultry) {
      throw new NotFoundException(`Poultry with ID ${id} not found`);
    }
    return this.poultryRepository.save(poultry);
  }
}
