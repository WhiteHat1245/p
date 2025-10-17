import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetDailyReportQuery } from 'src/DailyReport/queries/impl/GetDailyReportQuery';
import { DailyReport } from 'src/Core Models/DailyReport';

@QueryHandler(GetDailyReportQuery)
export class GetDailyReportHandler
  implements IQueryHandler<GetDailyReportQuery>
{
  constructor(
    @InjectRepository(DailyReport)
    private readonly dailyReportRepository: Repository<DailyReport>,
  ) {}

  async execute(query: GetDailyReportQuery): Promise<DailyReport> {
    const { reportId } = query;
    const report = await this.dailyReportRepository.findOne({
      where: { ReportID: reportId },
    });
    if (!report) {
      throw new NotFoundException(`Daily Report with ID ${reportId} not found`);
    }
    return report;
  }
}
