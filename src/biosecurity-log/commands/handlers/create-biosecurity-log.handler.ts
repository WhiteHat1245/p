import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BiosecurityLog } from 'src/Core Models/BiosecurityLog';
import { CreateBiosecurityLogCommand } from '../Impi/create-biosecurity-log.command';

@CommandHandler(CreateBiosecurityLogCommand)
export class CreateBiosecurityLogHandler
  implements ICommandHandler<CreateBiosecurityLogCommand>
{
  constructor(
    @InjectRepository(BiosecurityLog)
    private readonly repository: Repository<BiosecurityLog>,
  ) {}

  async execute(command: CreateBiosecurityLogCommand): Promise<BiosecurityLog> {
    const { createBiosecurityLogDto: createBiosecurityLogDto } = command;
    const log = this.repository.create(
      createBiosecurityLogDto as BiosecurityLog,
    );
    return this.repository.save(log);
  }
}
