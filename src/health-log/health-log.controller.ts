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
import { CreateHealthLogCommand } from './commands/impl/create-health-log.command';
import { UpdateHealthLogCommand } from './commands/impl/update-health-log.command';
import { RemoveHealthLogCommand } from './commands/impl/remove-health-log.command';
import { GetHealthLogQuery } from './queries/impl/get-health-log.query';
import { GetHealthLogsQuery } from './queries/impl/get-health-logs.query';
import { CreateHealthLogDto } from './dto/create-health-log.dto.ts/create-health-log.dto.ts';
import { HealthLog } from 'src/Core Models/HealthLog';
import { UpdateHealthLogDto } from './dto/update-health-log.dto.ts/update-health-log.dto.ts';

@Controller('health-log')
export class HealthLogController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateHealthLogDto): Promise<HealthLog> {
    return this.commandBus.execute(new CreateHealthLogCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<HealthLog> {
    return this.queryBus.execute(new GetHealthLogQuery(id));
  }

  @Get()
  findAll(): Promise<HealthLog[]> {
    return this.queryBus.execute(new GetHealthLogsQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHealthLogDto,
  ): Promise<HealthLog> {
    return this.commandBus.execute(new UpdateHealthLogCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveHealthLogCommand(id));
  }
}
