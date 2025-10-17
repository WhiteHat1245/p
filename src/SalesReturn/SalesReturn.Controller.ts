import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSalesReturnDto } from './dto/CreateSalesReturnDto';
import { CreateSalesReturnCommand } from './Command/Impl/createSalesReturnDto';
import { SalesReturn } from 'src/Core Models/SalesReturn';
import { RemoveSalesReturnCommand } from './Command/Impl/RemoveSalesReturnCommand';
import { GetSalesReturnQuery } from './Queries/Impl/GetSalesReturnQuery';
import { GetSalesReturnsQuery } from './Queries/Impl/GetSalesReturnsQuery';

@Controller('sales-return')
export class SalesReturnController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateSalesReturnDto): Promise<SalesReturn> {
    return this.commandBus.execute(new CreateSalesReturnCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SalesReturn> {
    return this.queryBus.execute(new GetSalesReturnQuery(id));
  }

  @Get()
  findAll(): Promise<SalesReturn[]> {
    return this.queryBus.execute(new GetSalesReturnsQuery());
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveSalesReturnCommand(id));
  }
}
