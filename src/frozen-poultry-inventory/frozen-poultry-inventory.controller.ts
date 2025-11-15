import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateFrozenPoultryInventoryDto } from './dto/create-frozen-poultry-inventory.dto';
import { UpdateFrozenPoultryInventoryDto } from './dto/update-frozen-poultry-inventory.dto';
import { CreateFrozenPoultryInventoryCommand } from './commands/impl/create-frozen-poultry-inventory.command';
import { GetFrozenPoultryInventoryListQuery } from './queries/impl/get-frozen-poultry-inventory-list.query';
import { GetFrozenPoultryInventoryQuery } from './queries/impl/get-frozen-poultry-inventory.query';
import { UpdateFrozenPoultryInventoryCommand } from './commands/impl/update-frozen-poultry-inventory.command';
import { RemoveFrozenPoultryInventoryCommand } from './commands/impl/remove-frozen-poultry-inventory.command';

@Controller('frozen-poultry-inventory')
export class FrozenPoultryInventoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateFrozenPoultryInventoryDto) {
    return this.commandBus.execute(new CreateFrozenPoultryInventoryCommand(dto));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetFrozenPoultryInventoryListQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetFrozenPoultryInventoryQuery(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateFrozenPoultryInventoryDto) {
    return this.commandBus.execute(new UpdateFrozenPoultryInventoryCommand(parseInt(id, 10), dto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commandBus.execute(new RemoveFrozenPoultryInventoryCommand(id));
  }
}
