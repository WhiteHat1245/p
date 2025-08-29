// src/feed/feed.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { FeedController } from './feed.controller';

// استيراد مستلمات الأوامر
import { CreateFeedHandler } from './commands/handlers/create-feed.handler';
import { UpdateFeedHandler } from './commands/handlers/update-feed.handler';
import { RemoveFeedHandler } from './commands/handlers/remove-feed.handler';

// استيراد مستلمات الاستعلامات
import { GetFeedHandler } from './queries/handlers/get-feed.handler';
import { GetFeedsHandler } from './queries/handlers/get-feeds.handler';
import { Feed } from 'src/Core Models/Feed';

const CommandHandlers = [CreateFeedHandler, UpdateFeedHandler, RemoveFeedHandler];
const QueryHandlers = [GetFeedHandler, GetFeedsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Feed]), CqrsModule],
  controllers: [FeedController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class FeedModule {}