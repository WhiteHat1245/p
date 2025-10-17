import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateDailyReportDto {
  @IsDateString()
  @IsNotEmpty()
  ReportDate: Date;

  @IsString()
  @IsNotEmpty()
  @Length(10, 255)
  Summary: string;

  @IsString()
  @IsOptional()
  Notes: string;
}
