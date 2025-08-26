 // src/slaughterhouse/commands/handlers/create-slaughterhouse.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSlaughterhouseCommand } from '../impl/create-slaughterhouse.command';
import { Slaughterhouse } from 'src/Core Models/slaughterhouse';

@CommandHandler(CreateSlaughterhouseCommand)
export class CreateSlaughterhouseHandler implements ICommandHandler<CreateSlaughterhouseCommand> {
  constructor(
    @InjectRepository(Slaughterhouse)
    private readonly slaughterhouseRepository: Repository<Slaughterhouse>,
  ) {}

  async execute(command: CreateSlaughterhouseCommand): Promise<Slaughterhouse> {
    const { createSlaughterhouseDto } = command;
    const slaughterhouse = this.slaughterhouseRepository.create(createSlaughterhouseDto as Partial<Slaughterhouse>);
    return this.slaughterhouseRepository.save(slaughterhouse as Slaughterhouse);
  }
}