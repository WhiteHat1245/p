
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateJournalEntryDto } from '../chart-of-accounts/dto/create-journal-entry.dto';
import { CreateJournalEntryCommand } from './commands/impl/create-journal-entry.command';
import { GetJournalEntryQuery } from './queries/impl/get-journal-entry.query';

@Controller('journal-entry')
export class JournalEntryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createJournalEntryDto: CreateJournalEntryDto) {
    return this.commandBus.execute(new CreateJournalEntryCommand(createJournalEntryDto));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetJournalEntryQuery(id));
  }
}
