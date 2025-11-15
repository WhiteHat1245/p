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
import { CreateFeedConsumptionDto } from './dto/create-feed-consumption.dto';
import { UpdateFeedConsumptionDto } from './dto/update-feed-consumption.dto';
import { CreateFeedConsumptionCommand } from './commands/create-feed-consumption.command';
import { FeedConsumption } from 'src/Core Models/FeedConsumption';
import { UpdateFeedConsumptionCommand } from './commands/update-feed-consumption.command';
import { RemoveFeedConsumptionCommand } from './commands/remove-feed-consumption.command';
import { GetFeedConsumptionQuery } from './queries/get-feed-consumption.query';
import { GetFeedConsumptionsListQuery } from './queries/get-feed-consumptions-list.query';

@Controller('feed-consumption')
export class FeedConsumptionController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreateFeedConsumptionDto): Promise<FeedConsumption> {
    return this.commandBus.execute(new CreateFeedConsumptionCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FeedConsumption> {
    return this.queryBus.execute(new GetFeedConsumptionQuery(id));
  }

  @Get()
  findAll(): Promise<FeedConsumption[]> {
    return this.queryBus.execute(new GetFeedConsumptionsListQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFeedConsumptionDto,
  ): Promise<FeedConsumption> {
    return this.commandBus.execute(new UpdateFeedConsumptionCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveFeedConsumptionCommand(id));
  }
}
