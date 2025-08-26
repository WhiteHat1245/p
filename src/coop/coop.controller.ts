// src/coop/coop.controller.ts
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

// استيراد الأوامر
import { CreateCoopCommand, RemoveCoopCommand, UpdateCoopCommand } from './commands/impl/create-coop.command';

// استيراد الاستعلامات
import { GetCoopQuery, GetCoopsQuery } from './queries/impl/get-coop.query';


// استيراد DTOs
import { CreateCoopDto } from './dto/create-coop.dto';
import { UpdateCoopDto } from './dto/update-coop.dto';
import { Coop } from 'src/Core Models/Coop';


@Controller('coop')
export class CoopController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreateCoopDto): Promise<Coop> {
    return this.commandBus.execute(new CreateCoopCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Coop> {
    return this.queryBus.execute(new GetCoopQuery(id));
  }

  @Get()
  findAll(): Promise<Coop[]> {
    return this.queryBus.execute(new GetCoopsQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCoopDto,
  ): Promise<Coop> {
    return this.commandBus.execute(new UpdateCoopCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveCoopCommand(id));
  }
}