import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MortalityController } from './mortality.controller';
import { MortalityCommandHandlers } from './commands';
import { MortalityQueryHandlers } from './queries';
import { Mortality } from 'src/Core Models/Mortality';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Mortality]),
  ],
  controllers: [MortalityController],
  providers: [
    ...MortalityCommandHandlers,
    ...MortalityQueryHandlers,
  ],
})
export class MortalityModule {}