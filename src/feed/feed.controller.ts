// src/feed/feed.controller.ts
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
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';

// استيراد الأوامر والاستعلامات
import { CreateFeedCommand } from './commands/impl/create-feed.command';
import { UpdateFeedCommand } from './commands/impl/update-feed.command';
import { RemoveFeedCommand } from './commands/impl/remove-feed.command';
import { GetFeedQuery } from './queries/impl/get-feed.query';
import { GetFeedsQuery } from './queries/impl/get-feeds.query';
import { Feed } from 'src/Core Models/Feed';

@Controller('feed')
export class FeedController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateFeedDto): Promise<Feed> {
    return this.commandBus.execute(new CreateFeedCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Feed> {
    return this.queryBus.execute(new GetFeedQuery(id));
  }

  @Get()
  findAll(): Promise<Feed[]> {
    return this.queryBus.execute(new GetFeedsQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFeedDto,
  ): Promise<Feed> {
    return this.commandBus.execute(new UpdateFeedCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveFeedCommand(id));
  }
}
