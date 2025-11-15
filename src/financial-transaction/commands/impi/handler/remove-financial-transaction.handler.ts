import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveFinancialTransactionCommand } from '../remove-financial-transaction.command';
import { FinancialTransaction } from 'src/Core Models/FinancialTransaction';

@CommandHandler(RemoveFinancialTransactionCommand)
export class RemoveFinancialTransactionHandler
  implements ICommandHandler<RemoveFinancialTransactionCommand>
{
  constructor(
    @InjectRepository(FinancialTransaction)
    private readonly financialTransactionRepository: Repository<FinancialTransaction>,
  ) {}

  async execute(command: RemoveFinancialTransactionCommand): Promise<void> {
    const { id } = command;
    const result = await this.financialTransactionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`FinancialTransaction with ID ${id} not found`);
    }
  }
}