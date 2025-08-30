import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveExpenseCommand } from '../Impi/RemoveExpenseCommand';
import { Expense } from 'src/Core Models/Expense';

@CommandHandler(RemoveExpenseCommand)
export class RemoveExpenseHandler implements ICommandHandler<RemoveExpenseCommand> {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async execute(command: RemoveExpenseCommand): Promise<void> {
    const { id } = command;
    const result = await this.expenseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
  }
}
