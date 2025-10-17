import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateExpenseHandler } from './Commands/handlers/CreateExpenseHandler';
import { GetExpenseHandler } from './Queries/Handlers/GetExpenseHandler';
import { GetExpensesHandler } from './Queries/Handlers/GetExpensesHandler';
import { UpdateExpenseHandler } from './Commands/handlers/UpdateExpenseHandler';
import { RemoveExpenseHandler } from './Commands/handlers/RemoveExpenseHandler';
import { Expense } from 'src/Core Models/Expense';
import { ExpenseController } from './Expense.Controller';

const CommandHandlers = [
  CreateExpenseHandler,
  UpdateExpenseHandler,
  RemoveExpenseHandler,
];
const QueryHandlers = [GetExpenseHandler, GetExpensesHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), CqrsModule],
  controllers: [ExpenseController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class ExpenseModule {}
