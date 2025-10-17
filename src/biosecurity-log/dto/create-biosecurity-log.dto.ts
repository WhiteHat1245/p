import { IsDateString, IsString, Length } from 'class-validator';

export class CreateBiosecurityLogDto {
  @IsDateString()
  LogDate: Date;

  @IsString()
  @Length(1, 255)
  Activity: string;

  @IsString()
  @Length(1, 255)
  Notes: string;

  @IsString()
  @Length(1, 50)
  PerformedBy: string;
}
