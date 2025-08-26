import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Coop } from 'src/Core Models/Coop';
import { RemoveCoopCommand } from '../impl/create-coop.command';


@CommandHandler(RemoveCoopCommand)
export class RemoveCoopHandler implements ICommandHandler<RemoveCoopCommand> {
  constructor(
    @InjectRepository(Coop)
    private readonly coopRepository: Repository<Coop>,
  ) {}

  async execute(command: RemoveCoopCommand): Promise<void> {
    const { id } = command;
    const result = await this.coopRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Coop with ID ${id} not found`);
    }
  }
}