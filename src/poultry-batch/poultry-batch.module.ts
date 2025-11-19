import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePoultryBatchHandler } from './commands/poultry-batch-commands';

@Module({
  imports: [CqrsModule],
  providers: [CreatePoultryBatchHandler],
})
export class PoultryBatchModule {}
