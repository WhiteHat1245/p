import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDebtDto } from './dto/CreateDebtDto';
import { CreateDebtCommand } from './Commands/impl/CreateDebtCommand';
import { Debt } from 'src/Core Models/Debt';
import { GetDebtQuery } from './queries/impl/GetDebtQuery';
import { GetDebtsQuery } from './queries/impl/GetDebtsQuery';
import { GetTotalDebtQuery } from './queries/impl/get-total-debt.query';
import { UpdateDebtDto } from './dto/UpdateDebtDto';
import { UpdateDebtCommand } from './Commands/impl/UpdateDebtCommand';
import { RemoveDebtCommand } from './Commands/impl/RemoveDebtCommand';

@Controller('debt')
export class DebtController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateDebtDto): Promise<Debt> {
    return this.commandBus.execute(new CreateDebtCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Debt> {
    return this.queryBus.execute(new GetDebtQuery(id));
  }

  @Get()
  findAll(): Promise<Debt[]> {
    return this.queryBus.execute(new GetDebtsQuery());
  }

  @Get('total/:customerId')
  getTotalDebt(
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<number> {
    return this.queryBus.execute(new GetTotalDebtQuery(customerId));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDebtDto,
  ): Promise<Debt> {
    return this.commandBus.execute(new UpdateDebtCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveDebtCommand(id));
  }
}
