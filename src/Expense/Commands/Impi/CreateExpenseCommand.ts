import { CreateExpenseDto } from 'src/Expense/dto/CreateExpenseDto';

export class CreateExpenseCommand {
  constructor(public readonly createExpenseDto: CreateExpenseDto) {}
}
