
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralLedger } from 'src/Core Models/GeneralLedger';
import { RemoveGeneralLedgerCommand } from '../impl/remove-general-ledger.command';

@CommandHandler(RemoveGeneralLedgerCommand)
export class RemoveGeneralLedgerHandler
  implements ICommandHandler<RemoveGeneralLedgerCommand>
{
  constructor(
    @InjectRepository(GeneralLedger)
    private readonly generalLedgerRepository: Repository<GeneralLedger>,
  ) {}

  async execute(command: RemoveGeneralLedgerCommand): Promise<void> {
    const { ledgerId } = command;
    await this.generalLedgerRepository.delete(ledgerId);
  }
}
