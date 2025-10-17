import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Coop } from 'src/Core Models/Coop';
import { UpdateCoopCommand } from '../impl/create-coop.command';

@CommandHandler(UpdateCoopCommand)
export class UpdateCoopHandler implements ICommandHandler<UpdateCoopCommand> {
  constructor(
    @InjectRepository(Coop)
    private readonly coopRepository: Repository<Coop>,
  ) {}

  async execute(command: UpdateCoopCommand): Promise<Coop> {
    const { id, updateCoopDto } = command;
    const coop = await this.coopRepository.preload({
      CoopID: id,
      ...updateCoopDto,
    });
    if (!coop) {
      throw new NotFoundException(`Coop with ID ${id} not found`);
    }
    return this.coopRepository.save(coop);
  }
}
