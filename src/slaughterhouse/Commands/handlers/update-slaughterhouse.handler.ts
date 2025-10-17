// src/slaughterhouse/commands/handlers/update-slaughterhouse.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateSlaughterhouseCommand } from '../impl/update-slaughterhouse.command';
import { Slaughterhouse } from 'src/Core Models/slaughterhouse';

@CommandHandler(UpdateSlaughterhouseCommand)
export class UpdateSlaughterhouseHandler
  implements ICommandHandler<UpdateSlaughterhouseCommand>
{
  constructor(
    @InjectRepository(Slaughterhouse)
    private readonly slaughterhouseRepository: Repository<Slaughterhouse>,
  ) {}

  async execute(command: UpdateSlaughterhouseCommand): Promise<Slaughterhouse> {
    const { id, updateSlaughterhouseDto } = command;
    const slaughterhouse = await this.slaughterhouseRepository.preload({
      SlaughterhouseID: id,
      ...updateSlaughterhouseDto,
    });
    if (!slaughterhouse) {
      throw new NotFoundException(`Slaughterhouse with ID ${id} not found`);
    }
    return this.slaughterhouseRepository.save(slaughterhouse);
  }
}
