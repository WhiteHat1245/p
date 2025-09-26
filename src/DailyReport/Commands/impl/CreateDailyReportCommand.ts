import { CreateDailyReportDto } from '../../dto/CreateDailyReportDto';
export class CreateDailyReportCommand {
  constructor(public readonly createDailyReportDto: CreateDailyReportDto) {}
}
