import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateDailyReportCommand } from '../impl/UpdateDailyReportCommand';
import { DailyReport } from 'src/Core Models/DailyReport';

@CommandHandler(UpdateDailyReportCommand) 
export class UpdateDailyReportHandler implements ICommandHandler<UpdateDailyReportCommand> {
  constructor(
    @InjectRepository(DailyReport)
    private readonly dailyReportRepository: Repository<DailyReport>,
  ) {}

  async execute(command: UpdateDailyReportCommand): Promise<DailyReport> {
    const { id, updateDailyReportDto } = command;
    const report = await this.dailyReportRepository.preload({ ReportID: id, ...updateDailyReportDto });
    if (!report) {
      throw new NotFoundException(`Daily Report with ID ${id} not found`);
    }
    return this.dailyReportRepository.save(report);
  }
}
