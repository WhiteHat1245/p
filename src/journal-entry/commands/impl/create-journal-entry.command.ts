import { CreateJournalEntryDto } from "src/chart-of-accounts/dto/create-journal-entry.dto";

export class CreateJournalEntryCommand {
  constructor(public readonly createJournalEntryDto: CreateJournalEntryDto) {}
}
