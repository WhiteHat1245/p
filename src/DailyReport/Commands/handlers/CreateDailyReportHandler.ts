import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDailyReportCommand } from '../impl/CreateDailyReportCommand';
import { DailyReport } from 'src/Core Models/DailyReport';

@CommandHandler(CreateDailyReportCommand)
export class CreateDailyReportHandler
  implements ICommandHandler<CreateDailyReportCommand>
{
  constructor(
    @InjectRepository(DailyReport)
    private readonly dailyReportRepository: Repository<DailyReport>,
  ) {}

  async execute(command: CreateDailyReportCommand): Promise<DailyReport> {
    const { createDailyReportDto } = command;
    const report = this.dailyReportRepository.create(createDailyReportDto);
    return this.dailyReportRepository.save(report);
  }
}
