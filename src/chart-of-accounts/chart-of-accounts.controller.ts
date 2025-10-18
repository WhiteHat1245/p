import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { CreateJournalEntryCommand } from './commands/create-journal-entry.command';
import { GetJournalEntriesQuery } from './queries/get-journal-entries.query';
import { GetJournalEntryQuery } from './queries/get-journal-entry.query';

@Controller('chart-of-accounts')
export class ChartOfAccountsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('journal-entry')
  async createJournalEntry(
    @Body() createJournalEntryDto: CreateJournalEntryDto,
  ) {
    return this.commandBus.execute(
      new CreateJournalEntryCommand(createJournalEntryDto),
    );
  }

  @Get('journal-entries')
  async getJournalEntries() {
    return this.queryBus.execute(new GetJournalEntriesQuery());
  }

  @Get('journal-entry/:id')
  async getJournalEntry(@Param('id') id: string) {
    return this.queryBus.execute(new GetJournalEntryQuery(id));
  }
}
