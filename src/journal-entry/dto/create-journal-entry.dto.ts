import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JournalEntryDetailDto } from './journal-entry-detail.dto';

export class CreateJournalEntryDto {
  @IsString()
  memo: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JournalEntryDetailDto)
  details: JournalEntryDetailDto[];
}
