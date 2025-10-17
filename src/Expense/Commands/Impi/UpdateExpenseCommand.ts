import { UpdateExpenseDto } from 'src/Expense/dto/UpdateExpenseDto';

export class UpdateExpenseCommand {
  constructor(
    public readonly id: number,
    public readonly updateExpenseDto: UpdateExpenseDto,
  ) {}
}
