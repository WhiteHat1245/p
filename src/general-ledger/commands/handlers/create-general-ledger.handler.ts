
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralLedger } from 'src/Core Models/GeneralLedger';
import { CreateGeneralLedgerCommand } from '../impl/create-general-ledger.command';

@CommandHandler(CreateGeneralLedgerCommand)
export class CreateGeneralLedgerHandler
  implements ICommandHandler<CreateGeneralLedgerCommand>
{
  constructor(
    @InjectRepository(GeneralLedger)
    private readonly generalLedgerRepository: Repository<GeneralLedger>,
  ) {}

  async execute(command: CreateGeneralLedgerCommand): Promise<GeneralLedger> {
    const { createGeneralLedgerDto } = command;
    const generalLedger = this.generalLedgerRepository.create(createGeneralLedgerDto);
    return this.generalLedgerRepository.save(generalLedger);
  }
}
