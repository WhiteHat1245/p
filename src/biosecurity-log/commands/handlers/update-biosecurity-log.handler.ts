import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBiosecurityLogCommand } from '../Impi/update-biosecurity-log.command';
import { BiosecurityLog } from 'src/Core Models/BiosecurityLog';

@CommandHandler(UpdateBiosecurityLogCommand)
export class UpdateBiosecurityLogHandler
  implements ICommandHandler<UpdateBiosecurityLogCommand>
{
  constructor(
    @InjectRepository(BiosecurityLog)
    private readonly repository: Repository<BiosecurityLog>,
  ) {}

  async execute(command: UpdateBiosecurityLogCommand): Promise<BiosecurityLog> {
    const { id, updateBiosecurityLogDto } = command;
    await this.repository.update(id, updateBiosecurityLogDto);
    const updatedLog = await this.repository.findOneBy({ LogID: id });
    if (!updatedLog) {
      throw new Error(`BiosecurityLog with ID ${id} not found after update.`);
    }
    return updatedLog;
  }
}
