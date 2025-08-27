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
import { CreateFarmCommand } from './commands/impl/create-farm.command';
import { UpdateFarmCommand } from './commands/impl/update-farm.command';
import { RemoveFarmCommand } from './commands/impl/remove-farm.command';
import { GetFarmQuery } from './queries/impl/get-farm.query';
import { Farm } from 'src/Core Models/Farm';
import { CreateFarmDto } from './dto/create-farm.dto.ts/create-farm.dto.ts';
import { GetFarmsQuery } from './queries/impl/et-farms.query';
import { UpdateFarmDto } from './dto/update-farm.dto.ts/update-farm.dto.ts';


@Controller('farm')
export class FarmController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreateFarmDto): Promise<Farm> {
    return this.commandBus.execute(new CreateFarmCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Farm> {
    return this.queryBus.execute(new GetFarmQuery(id));
  }

  @Get()
  findAll(): Promise<Farm[]> {
    return this.queryBus.execute(new GetFarmsQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFarmDto,
  ): Promise<Farm> {
    return this.commandBus.execute(new UpdateFarmCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveFarmCommand(id));
  }
}