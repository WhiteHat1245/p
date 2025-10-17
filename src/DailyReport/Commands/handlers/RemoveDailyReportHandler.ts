import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveDailyReportCommand } from '../impl/RemoveDailyReportCommand';
import { DailyReport } from 'src/Core Models/DailyReport';

@CommandHandler(RemoveDailyReportCommand)
export class RemoveDailyReportHandler
  implements ICommandHandler<RemoveDailyReportCommand>
{
  constructor(
    @InjectRepository(DailyReport)
    private readonly dailyReportRepository: Repository<DailyReport>,
  ) {}

  async execute(command: RemoveDailyReportCommand): Promise<void> {
    const { id } = command;
    const result = await this.dailyReportRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Daily Report with ID ${id} not found`);
    }
  }
}
