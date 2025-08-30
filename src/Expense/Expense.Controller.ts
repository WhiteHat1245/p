import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateExpenseCommand } from './Commands/Impi/CreateExpenseCommand';
import { CreateExpenseDto } from './dto/CreateExpenseDto';
import { Expense } from 'src/Core Models/Expense';
import { GetExpenseQuery } from './Queries/Impi/GetExpenseQuery';
import { GetExpensesQuery } from './Queries/Impi/GetExpensesQuery';
import { UpdateExpenseDto } from './dto/UpdateExpenseDto';
import { UpdateExpenseCommand } from './Commands/Impi/UpdateExpenseCommand';
import { RemoveExpenseCommand } from './Commands/Impi/RemoveExpenseCommand';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreateExpenseDto): Promise<Expense> {
    return this.commandBus.execute(new CreateExpenseCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Expense> {
    return this.queryBus.execute(new GetExpenseQuery(id));
  }

  @Get()
  findAll(): Promise<Expense[]> {
    return this.queryBus.execute(new GetExpensesQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.commandBus.execute(new UpdateExpenseCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveExpenseCommand(id));
  }
}
