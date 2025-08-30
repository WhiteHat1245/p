import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateExpenseCommand } from '../Impi/UpdateExpenseCommand';
import { Expense } from 'src/Core Models/Expense';


@CommandHandler(UpdateExpenseCommand)
export class UpdateExpenseHandler implements ICommandHandler<UpdateExpenseCommand> {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async execute(command: UpdateExpenseCommand): Promise<Expense> {
    const { id, updateExpenseDto } = command;
    const expense = await this.expenseRepository.preload({ ExpenseID: id, ...updateExpenseDto });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return this.expenseRepository.save(expense);
  }
}
