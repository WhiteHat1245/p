// src/feed/queries/handlers/get-feeds.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFeedsQuery } from '../impl/get-feeds.query';
import { Feed } from 'src/Core Models/Feed';

@QueryHandler(GetFeedsQuery)
export class GetFeedsHandler implements IQueryHandler<GetFeedsQuery> {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  async execute(): Promise<Feed[]> {
    return this.feedRepository.find();
  }
}