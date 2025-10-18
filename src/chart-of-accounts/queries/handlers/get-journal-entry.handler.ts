import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJournalEntryQuery } from '../get-journal-entry.query';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/Core Models/JournalEntry';
import { Repository } from 'typeorm';

@QueryHandler(GetJournalEntryQuery)
export class GetJournalEntryHandler
  implements IQueryHandler<GetJournalEntryQuery>
{
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
  ) {}

  async execute(query: GetJournalEntryQuery): Promise<JournalEntry> {
    return this.journalEntryRepository.findOneOrFail({
      where: { id: query.id },
      relations: ['details'],
    });
  }
}
