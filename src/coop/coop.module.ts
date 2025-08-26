import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CoopController } from './coop.controller';


// استيراد مستلمات الأوامر
import { CreateCoopHandler } from './commands/handlers/create-coop.handler';
import { UpdateCoopHandler } from './commands/handlers/update-coop.handler';
import { RemoveCoopHandler } from './commands/handlers/remove-coop.handler';

// استيراد مستلمات الاستعلامات
import { GetCoopHandler } from './queries/handlers/get-coop.handler';
import { GetCoopsHandler } from './queries/handlers/get-coops.handler';
import { Coop } from 'src/Core Models/Coop';

const CommandHandlers = [CreateCoopHandler, UpdateCoopHandler, RemoveCoopHandler];
const QueryHandlers = [GetCoopHandler, GetCoopsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Coop]), CqrsModule],
  controllers: [CoopController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class CoopModule {}