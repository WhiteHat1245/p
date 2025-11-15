import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFinancialTransactionCommand } from '../create-financial-transaction.command';
import { FinancialTransaction } from 'src/Core Models/FinancialTransaction';

@CommandHandler(CreateFinancialTransactionCommand)
export class CreateFinancialTransactionHandler
  implements ICommandHandler<CreateFinancialTransactionCommand>
{
  constructor(
    @InjectRepository(FinancialTransaction)
    private readonly financialTransactionRepository: Repository<FinancialTransaction>,
  ) {}

  async execute(
    command: CreateFinancialTransactionCommand,
  ): Promise<FinancialTransaction> {
    const { createFinancialTransactionDto } = command;
    const financialTransaction = this.financialTransactionRepository.create(
      createFinancialTransactionDto as Partial<FinancialTransaction>,
    );
    return this.financialTransactionRepository.save(financialTransaction);
  }
}