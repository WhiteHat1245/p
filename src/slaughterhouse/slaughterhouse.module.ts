import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { SlaughterhouseController } from './slaughterhouse.controller';

// استيراد مستلمات الاستعلامات
import { GetSlaughterhouseHandler } from './queries/handlers/get-slaughterhouse.handler';
import { GetSlaughterhousesHandler } from './queries/handlers/get-slaughterhouses.handler';
import { CreateSlaughterhouseHandler } from './Commands/handlers/create-slaughterhouse.handler';
import { UpdateSlaughterhouseHandler } from './Commands/handlers/update-slaughterhouse.handler';
import { RemoveSlaughterhouseHandler } from './Commands/handlers/remove-slaughterhouse.handler';
import { Slaughterhouse } from 'src/Core Models/slaughterhouse';

const CommandHandlers = [CreateSlaughterhouseHandler, UpdateSlaughterhouseHandler, RemoveSlaughterhouseHandler];
const QueryHandlers = [GetSlaughterhouseHandler, GetSlaughterhousesHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Slaughterhouse]), CqrsModule],
  controllers: [SlaughterhouseController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class SlaughterhouseModule {}