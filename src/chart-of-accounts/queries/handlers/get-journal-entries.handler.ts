import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJournalEntriesQuery } from '../get-journal-entries.query';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/Core Models/JournalEntry';
import { Repository } from 'typeorm';

@QueryHandler(GetJournalEntriesQuery)
export class GetJournalEntriesHandler
  implements IQueryHandler<GetJournalEntriesQuery>
{
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
  ) {}

  async execute(query: GetJournalEntriesQuery): Promise<JournalEntry[]> {
    return this.journalEntryRepository.find({ relations: ['details'] });
  }
}
