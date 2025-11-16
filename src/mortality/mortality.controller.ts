import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMortalityDto } from './dto/create-mortality.dto';
import { UpdateMortalityDto } from './dto/update-mortality.dto';
import { CreateMortalityCommand } from './commands/mortality.commands';
import { UpdateMortalityCommand } from './commands/mortality.commands';
import { DeleteMortalityCommand } from './commands/mortality.commands';
import { GetAllMortalitesQuery, GetMortalityByIdQuery } from './queries/mortality.queries';

@Controller('mortality')
export class MortalityController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createMortalityDto: CreateMortalityDto) {
    return this.commandBus.execute(new CreateMortalityCommand(createMortalityDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllMortalitesQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetMortalityByIdQuery(+id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMortalityDto: UpdateMortalityDto) {
    return this.commandBus.execute(new UpdateMortalityCommand(+id, updateMortalityDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteMortalityCommand(+id));
  }
}