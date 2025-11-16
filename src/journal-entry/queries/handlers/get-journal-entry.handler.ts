import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetJournalEntryQuery } from '../impl/get-journal-entry.query';
import { JournalEntry } from 'src/Core Models/JournalEntry';

@QueryHandler(GetJournalEntryQuery)
export class GetJournalEntryHandler
  implements IQueryHandler<GetJournalEntryQuery>
{
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
  ) {}

  async execute(query: GetJournalEntryQuery): Promise<JournalEntry | null> {
    const journalEntry = await this.journalEntryRepository.findOne({
      where: { id: query.id },
      relations: ['details', 'details.account'],
    });

    if (!journalEntry) {
      return null;
    }
    return journalEntry;
  }
}
