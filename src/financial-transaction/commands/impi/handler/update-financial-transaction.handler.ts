import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateFinancialTransactionCommand } from '../update-financial-transaction.command';
import { FinancialTransaction } from 'src/Core Models/FinancialTransaction';

@CommandHandler(UpdateFinancialTransactionCommand)
export class UpdateFinancialTransactionHandler
  implements ICommandHandler<UpdateFinancialTransactionCommand>
{
  constructor(
    @InjectRepository(FinancialTransaction)
    private readonly financialTransactionRepository: Repository<FinancialTransaction>,
  ) {}

  async execute(
    command: UpdateFinancialTransactionCommand,
  ): Promise<FinancialTransaction> {
    const { id, updateFinancialTransactionDto } = command;
    const financialTransaction = await this.financialTransactionRepository.preload({
      TransactionID: Number(id),
      ...updateFinancialTransactionDto,
    });
    if (!financialTransaction) {
      throw new NotFoundException(`FinancialTransaction with ID ${id} not found`);
    }
    return this.financialTransactionRepository.save(financialTransaction);
  }
}