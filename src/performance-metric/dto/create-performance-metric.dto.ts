
import { IsNumber, IsDateString, IsString } from 'class-validator';

export class CreatePerformanceMetricDto {
  @IsNumber()
  batchId: number;

  @IsDateString()
  date: Date;

  @IsString()
  metricName: string;

  @IsNumber()
  value: number;
}
