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
import { CreateEggInventoryDto } from './dto/CreateEggInventoryDto';
import { CreateEggInventoryCommand } from './commands/Impi/CreateEggInventoryCommand';
import { EggInventory } from 'src/Core Models/EggInventory';
import { GetEggInventoryQuery } from './queries/Impi/GetEggInventoryQuery';
import { GetEggInventoriesQuery } from './queries/Impi/GetEggInventoriesQuery';
import { UpdateEggInventoryCommand } from './commands/Impi/UpdateEggInventoryCommand';
import { UpdateEggInventoryDto } from './dto/UpdateEggInventoryDto';
import { RemoveEggInventoryCommand } from './commands/Impi/RemoveEggInventoryCommand';

@Controller('egg-inventory')
export class EggInventoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateEggInventoryDto): Promise<EggInventory> {
    return this.commandBus.execute(new CreateEggInventoryCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EggInventory> {
    return this.queryBus.execute(new GetEggInventoryQuery(id));
  }

  @Get()
  findAll(): Promise<EggInventory[]> {
    return this.queryBus.execute(new GetEggInventoriesQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEggInventoryDto,
  ): Promise<EggInventory> {
    return this.commandBus.execute(new UpdateEggInventoryCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveEggInventoryCommand(id));
  }
}
