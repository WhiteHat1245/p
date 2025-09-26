import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyReport } from 'src/Core Models/DailyReport';
import { GetDailyReportsQuery } from '../impl/GetDailyReportsQuery';

@QueryHandler(GetDailyReportsQuery)
export class GetDailyReportsHandler implements IQueryHandler<GetDailyReportsQuery, DailyReport[]> {
  constructor(
    @InjectRepository(DailyReport)
    private readonly dailyReportRepository: Repository<DailyReport>,
  ) {}

  async execute(): Promise<DailyReport[]> {
    return this.dailyReportRepository.find();
  }
}
