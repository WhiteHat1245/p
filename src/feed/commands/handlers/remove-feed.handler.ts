// src/feed/commands/handlers/remove-feed.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveFeedCommand } from '../impl/remove-feed.command';
import { Feed } from 'src/Core Models/Feed';

@CommandHandler(RemoveFeedCommand)
export class RemoveFeedHandler implements ICommandHandler<RemoveFeedCommand> {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  async execute(command: RemoveFeedCommand): Promise<void> {
    const { id } = command;
    const result = await this.feedRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Feed with ID ${id} not found`);
    }
  }
}