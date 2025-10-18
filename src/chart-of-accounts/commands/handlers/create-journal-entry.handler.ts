import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJournalEntryCommand } from '../create-journal-entry.command';

@CommandHandler(CreateJournalEntryCommand)
export class CreateJournalEntryHandler
  implements ICommandHandler<CreateJournalEntryCommand>
{
  async execute(command: CreateJournalEntryCommand): Promise<any> {
    const { entries } = command.createJournalEntryDto;

    const totalDebits = entries
      .filter((e) => e.type === 'DEBIT')
      .reduce((acc, entry) => acc + entry.amount, 0);

    const totalCredits = entries
      .filter((e) => e.type === 'CREDIT')
      .reduce((acc, entry) => acc + entry.amount, 0);

    if (totalDebits !== totalCredits) {
      throw new Error('Debits and Credits must be equal.');
    }

    // Here you would typically save the journal entry to the database
    // For now, we'll just return a success message

    return { success: true, message: 'Journal entry is balanced.' };
  }
}
