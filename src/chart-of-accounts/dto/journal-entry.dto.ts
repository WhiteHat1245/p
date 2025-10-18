import { JournalEntryDetailDto } from './journal-entry-detail.dto';

export class JournalEntryDto {
  id: string;
  date: Date;
  memo: string;
  details: JournalEntryDetailDto[];
}
