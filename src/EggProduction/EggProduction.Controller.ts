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
import { CreateEggProductionDto } from './dto/CreateEggProductionDto/CreateEggProductionDto';
import { EggProduction } from 'src/Core Models/EggProduction';
import { CreateEggProductionCommand } from './Commands/Impi/CreateEggProductionCommand';
import { GetEggProductionQuery } from './queries/Impl/GetEggProductionQuery';
import { GetEggProductionsQuery } from './queries/Impl/GetEggProductionsQuery';
import { UpdateEggProductionDto } from './dto/UpdateEggProductionDto/UpdateEggProductionDto';
import { UpdateEggProductionCommand } from './Commands/Impi/UpdateEggProductionCommand';
import { RemoveEggProductionCommand } from './Commands/Impi/RemoveEggProductionCommand';
@Controller('egg-production')
export class EggProductionController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreateEggProductionDto): Promise<EggProduction> {
    return this.commandBus.execute(new CreateEggProductionCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EggProduction> {
    return this.queryBus.execute(new GetEggProductionQuery(id));
  }

  @Get()
  findAll(): Promise<EggProduction[]> {
    return this.queryBus.execute(new GetEggProductionsQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEggProductionDto,
  ): Promise<EggProduction> {
    return this.commandBus.execute(new UpdateEggProductionCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveEggProductionCommand(id));
  }
}
