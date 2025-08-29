// src/feed/queries/handlers/get-feed.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetFeedQuery } from '../impl/get-feed.query';
import { Feed } from 'src/Core Models/Feed';

@QueryHandler(GetFeedQuery)
export class GetFeedHandler implements IQueryHandler<GetFeedQuery> {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  async execute(query: GetFeedQuery): Promise<Feed> {
    const { feedId } = query;
    const feed = await this.feedRepository.findOne({ where: { FeedID: feedId } });
    if (!feed) {
      throw new NotFoundException(`Feed with ID ${feedId} not found`);
    }
    return feed;
  }
}