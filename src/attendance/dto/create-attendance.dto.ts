import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateAttendanceDto {
  @IsInt()
  EmployeeID: number;

  @IsDateString()
  AttendanceDate: Date;

  @IsDateString()
  @IsOptional()
  TimeIn: Date | null;

  @IsDateString()
  @IsOptional()
  TimeOut: Date | null;
}
