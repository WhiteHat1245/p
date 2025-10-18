import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ChartOfAccountsController } from './chart-of-accounts.controller';
import { CreateJournalEntryHandler } from './commands/handlers/create-journal-entry.handler';

export const CommandHandlers = [CreateJournalEntryHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ChartOfAccountsController],
  providers: [...CommandHandlers],
})
export class ChartOfAccountsModule {}
