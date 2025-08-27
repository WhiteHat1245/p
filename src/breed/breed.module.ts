import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { BreedController } from './breed.controller';

// استيراد مستلمات الأوامر
import { CreateBreedHandler } from './commands/handlers/create-breed.handler';
import { UpdateBreedHandler } from './commands/handlers/update-breed.handler';
import { RemoveBreedHandler } from './commands/handlers/remove-breed.handler';

// استيراد مستلمات الاستعلامات
import { GetBreedHandler } from './queries/handlers/get-breed.handler';
import { GetBreedsHandler } from './queries/handlers/get-breeds.handler';
import { Breed } from 'src/Core Models/Breed';
import { Poultry } from 'src/Core Models/Poultry';

const CommandHandlers = [CreateBreedHandler, UpdateBreedHandler, RemoveBreedHandler];
const QueryHandlers = [GetBreedHandler, GetBreedsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Breed, Poultry]), CqrsModule],
  controllers: [BreedController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class BreedModule {}