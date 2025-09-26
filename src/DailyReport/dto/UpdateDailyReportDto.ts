import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyReportDto } from './CreateDailyReportDto';

export class UpdateDailyReportDto extends PartialType(CreateDailyReportDto) {}
