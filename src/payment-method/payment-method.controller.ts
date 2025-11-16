
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { CreatePaymentMethodCommand, UpdatePaymentMethodCommand, DeletePaymentMethodCommand } from './commands/payment-method.commands';
import { GetAllPaymentMethodsQuery, GetPaymentMethodByIdQuery } from './queries/payment-method.queries';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.commandBus.execute(new CreatePaymentMethodCommand(createPaymentMethodDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllPaymentMethodsQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetPaymentMethodByIdQuery(+id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.commandBus.execute(new UpdatePaymentMethodCommand(+id, updatePaymentMethodDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeletePaymentMethodCommand(+id));
  }
}
