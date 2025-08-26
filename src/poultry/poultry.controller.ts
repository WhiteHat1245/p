// src/poultry/poultry.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// استيراد الأوامر
import { CreatePoultryCommand } from './commands/impl/create-poultry.command.js';
import { UpdatePoultryCommand } from './commands/impl/update-poultry.command.js';
import { RemovePoultryCommand } from './commands/impl/remove-poultry.command.js';

// استيراد الاستعلامات
import { GetPoultryQuery } from './queries/impl/get-poultry.query.js';
import { GetPoultriesQuery } from './queries/impl/get-poultries.query.js';

// استيراد DTOs
import { CreatePoultryDto } from './dto/create-poultry.dto.js';
import { UpdatePoultryDto } from './dto/update-poultry.dto.js';
import { Poultry } from '../Core Models/Poultry';

@Controller('poultry')
export class PoultryController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreatePoultryDto): Promise<Poultry> {
    return this.commandBus.execute(new CreatePoultryCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Poultry> {
    return this.queryBus.execute(new GetPoultryQuery(id));
  }

  @Get()
  findAll(): Promise<Poultry[]> {
    return this.queryBus.execute(new GetPoultriesQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePoultryDto,
  ): Promise<Poultry> {
    return this.commandBus.execute(new UpdatePoultryCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemovePoultryCommand(id));
  }
}