import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePurchaseReturnDto } from './dto/create-purchase-return.dto';
import { CreatePurchaseReturnCommand } from './commands/purchase-return-commands';
import { PurchaseReturn } from 'src/Core Models/PurchaseReturn';
import { GetPurchaseReturnQuery, GetPurchaseReturnsListQuery } from './queries/purchase-return.queries';

@Controller('purchase-return')
export class PurchaseReturnController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreatePurchaseReturnDto): Promise<PurchaseReturn> {
    // هذا الأمر سيحتوي على منطق معقد لتحديث المخزون والقيود المحاسبية
    return this.commandBus.execute(new CreatePurchaseReturnCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PurchaseReturn> {
 return this.queryBus.execute(new GetPurchaseReturnQuery(id));
  }

  @Get()
  findAll(): Promise<PurchaseReturn[]> {
 return this.queryBus.execute(new GetPurchaseReturnsListQuery());
  }
  
  // لا يوجد PATCH/DELETE افتراضياً بسبب تعقيد المنطق المالي والمخزني المرتبط بمرتجعات الشراء.
}