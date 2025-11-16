
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreatePaymentCommand, UpdatePaymentCommand, DeletePaymentCommand } from './commands/payment.commands';
import { GetAllPaymentsQuery, GetPaymentByIdQuery } from './queries/payment.queries';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.commandBus.execute(new CreatePaymentCommand(createPaymentDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllPaymentsQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetPaymentByIdQuery(+id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.commandBus.execute(new UpdatePaymentCommand(+id, updatePaymentDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeletePaymentCommand(+id));
  }
}
