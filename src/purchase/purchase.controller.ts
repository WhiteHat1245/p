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
import { CreatePurchaseCommand } from './commands/impl/create-purchase.command';
import { UpdatePurchaseCommand } from './commands/impl/update-purchase.command';
import { RemovePurchaseCommand } from './commands/impl/remove-purchase.command';
import { GetPurchaseQuery } from './queries/impl/get-purchase.query';
import { GetPurchasesQuery } from './queries/impl/get-purchases.query';
import { Purchase } from 'src/Core Models/Purchase ';
import { CreatePurchaseDto } from './dto/create-purchase.dto.ts/create-purchase.dto.ts';
import { UpdatePurchaseDto } from './dto/update-purchase.dto.ts/update-purchase.dto.ts';

@Controller('purchase')
export class PurchaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreatePurchaseDto): Promise<Purchase> {
    return this.commandBus.execute(new CreatePurchaseCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Purchase> {
    return this.queryBus.execute(new GetPurchaseQuery(id));
  }

  @Get()
  findAll(): Promise<Purchase[]> {
    return this.queryBus.execute(new GetPurchasesQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePurchaseDto,
  ): Promise<Purchase> {
    return this.commandBus.execute(new UpdatePurchaseCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemovePurchaseCommand(id));
  }
}
