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
import { CreateSupplierCommand } from './commands/impl/create-supplier.command';
import { UpdateSupplierCommand } from './commands/impl/update-supplier.command';
import { RemoveSupplierCommand } from './commands/impl/remove-supplier.command';
import { GetSupplierQuery } from './queries/impl/get-supplier.query';
import { GetSuppliersQuery } from './queries/impl/get-suppliers.query';
import { CreateSupplierDto } from './dto/create-supplier.dto.ts/create-supplier.dto.ts';
import { Supplier } from 'src/Core Models/Supplier';
import { UpdateSupplierDto } from './dto/update-supplier.dto.ts/update-supplier.dto.ts';

@Controller('supplier')
export class SupplierController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateSupplierDto): Promise<Supplier> {
    return this.commandBus.execute(new CreateSupplierCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Supplier> {
    return this.queryBus.execute(new GetSupplierQuery(id));
  }

  @Get()
  findAll(): Promise<Supplier[]> {
    return this.queryBus.execute(new GetSuppliersQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSupplierDto,
  ): Promise<Supplier> {
    return this.commandBus.execute(new UpdateSupplierCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveSupplierCommand(id));
  }
}
