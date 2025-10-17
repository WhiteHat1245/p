import { UpdateDailyReportDto } from '../../dto/UpdateDailyReportDto';
export class UpdateDailyReportCommand {
  constructor(
    public readonly id: number,
    public readonly updateDailyReportDto: UpdateDailyReportDto,
  ) {}
}
