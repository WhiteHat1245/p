// src/slaughterhouse/slaughterhouse.controller.ts
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
import { CreateSlaughterhouseDto } from './dto/create-slaughterhouse.dto';
import { UpdateSlaughterhouseDto } from './dto/update-slaughterhouse.dto';

// استيراد الأوامر والاستعلامات
import { GetSlaughterhouseQuery } from './queries/impl/get-slaughterhouse.query';
import { GetSlaughterhousesQuery } from './queries/impl/get-slaughterhouses.query';
import { Slaughterhouse } from 'src/Core Models/slaughterhouse';
import { CreateSlaughterhouseCommand } from './Commands/impl/create-slaughterhouse.command';
import { UpdateSlaughterhouseCommand } from './Commands/impl/update-slaughterhouse.command';
import { RemoveSlaughterhouseCommand } from './Commands/impl/remove-slaughterhouse.command';

@Controller('slaughterhouse')
export class SlaughterhouseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreateSlaughterhouseDto): Promise<Slaughterhouse> {
    return this.commandBus.execute(new CreateSlaughterhouseCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Slaughterhouse> {
    return this.queryBus.execute(new GetSlaughterhouseQuery(id));
  }

  @Get()
  findAll(): Promise<Slaughterhouse[]> {
    return this.queryBus.execute(new GetSlaughterhousesQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSlaughterhouseDto,
  ): Promise<Slaughterhouse> {
    return this.commandBus.execute(new UpdateSlaughterhouseCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveSlaughterhouseCommand(id));
  }
}