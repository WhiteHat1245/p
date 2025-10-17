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
// استيراد الأوامر والاستعلامات
import { CreateSaleCommand } from './commands/impl/create-sale.command';
import { UpdateSaleCommand } from './commands/impl/update-sale.command';
import { RemoveSaleCommand } from './commands/impl/remove-sale.command';
import { GetSaleQuery, GetSalesQuery } from './queries/impl/get-sale.query';
import { Sale } from 'src/Core Models/Sale ';
import { CreateSaleDto } from './dto/create-sale.dto.ts/create-sale.dto.ts';
import { UpdateSaleDto } from './dto/update-sale.dto.ts/update-sale.dto.ts';

@Controller('sale')
export class SaleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateSaleDto): Promise<Sale> {
    return this.commandBus.execute(new CreateSaleCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Sale> {
    return this.queryBus.execute(new GetSaleQuery(id));
  }

  @Get()
  findAll(): Promise<Sale[]> {
    return this.queryBus.execute(new GetSalesQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSaleDto,
  ): Promise<Sale> {
    return this.commandBus.execute(new UpdateSaleCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveSaleCommand(id));
  }
}
