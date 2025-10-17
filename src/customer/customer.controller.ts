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
import { CreateCustomerCommand } from './commands/impl/create-customer.command';
import { UpdateCustomerCommand } from './commands/impl/update-customer.command';
import { RemoveCustomerCommand } from './commands/impl/remove-customer.command';
import { GetCustomerQuery } from './queries/impl/get-customer.query';
import { GetCustomersQuery } from './queries/impl/get-customers.query';
import { Customer } from 'src/Core Models/Customer';
import { UpdateCustomerDto } from './dto/update-customer.dto.ts/update-customer.dto.ts';
import { CreateCustomerDto } from './dto/create-customer.dto.ts/create-customer.dto.ts';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.commandBus.execute(new CreateCustomerCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.queryBus.execute(new GetCustomerQuery(id));
  }

  @Get()
  findAll(): Promise<Customer[]> {
    return this.queryBus.execute(new GetCustomersQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.commandBus.execute(new UpdateCustomerCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveCustomerCommand(id));
  }
}
