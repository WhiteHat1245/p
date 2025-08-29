// src/feed/commands/handlers/update-feed.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateFeedCommand } from '../impl/update-feed.command';
import { Feed } from 'src/Core Models/Feed';

@CommandHandler(UpdateFeedCommand)
export class UpdateFeedHandler implements ICommandHandler<UpdateFeedCommand> {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  async execute(command: UpdateFeedCommand): Promise<Feed> {
    const { id, updateFeedDto } = command;
    const feed = await this.feedRepository.preload({ FeedID: id, ...updateFeedDto });
    if (!feed) {
      throw new NotFoundException(`Feed with ID ${id} not found`);
    }
    return this.feedRepository.save(feed);
  }
}