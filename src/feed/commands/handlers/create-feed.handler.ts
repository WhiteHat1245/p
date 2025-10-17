// src/feed/commands/handlers/create-feed.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedCommand } from '../impl/create-feed.command';
import { Feed } from 'src/Core Models/Feed';

@CommandHandler(CreateFeedCommand)
export class CreateFeedHandler implements ICommandHandler<CreateFeedCommand> {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  async execute(command: CreateFeedCommand): Promise<Feed> {
    const { createFeedDto } = command;
    const feed = this.feedRepository.create(createFeedDto as Partial<Feed>);
    return this.feedRepository.save(feed);
  }
}
