import { CreateJournalEntryDto } from '../dto/create-journal-entry.dto';

export class CreateJournalEntryCommand {
  constructor(public readonly createJournalEntryDto: CreateJournalEntryDto) {}
}
