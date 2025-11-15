import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateFinancialTransactionDto } from './dto/update-financial-transaction.dto';
import { GetFinancialTransactionsListQuery } from './queries/impl/get-financial-transactions-list.query';
import { GetFinancialTransactionQuery } from './queries/impl/get-financial-transaction.query';
import { CreateFinancialTransactionCommand } from './commands/impi/create-financial-transaction.command';
import { CreateFinancialTransactionDto } from './dto/CreateFinancialTransactionDto';
import { UpdateFinancialTransactionCommand } from './commands/impi/update-financial-transaction.command';
import { RemoveFinancialTransactionCommand } from './commands/impi/remove-financial-transaction.command';

@Controller('financial-transaction')
export class FinancialTransactionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createFinancialTransactionDto: CreateFinancialTransactionDto) {
    return this.commandBus.execute(
      new CreateFinancialTransactionCommand(createFinancialTransactionDto),
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetFinancialTransactionsListQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetFinancialTransactionQuery(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFinancialTransactionDto: UpdateFinancialTransactionDto,
  ) {
    return this.commandBus.execute(
      new UpdateFinancialTransactionCommand(id, updateFinancialTransactionDto),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new RemoveFinancialTransactionCommand(id));
  }
}
