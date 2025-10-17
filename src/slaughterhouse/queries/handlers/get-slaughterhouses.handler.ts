// src/slaughterhouse/queries/handlers/get-slaughterhouses.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slaughterhouse } from 'src/Core Models/slaughterhouse';
import { GetSlaughterhousesQuery } from '../impl/get-slaughterhouses.query';

@QueryHandler(GetSlaughterhousesQuery)
export class GetSlaughterhousesHandler
  implements IQueryHandler<GetSlaughterhousesQuery>
{
  constructor(
    @InjectRepository(Slaughterhouse)
    private readonly slaughterhouseRepository: Repository<Slaughterhouse>,
  ) {}

  async execute(): Promise<Slaughterhouse[]> {
    return this.slaughterhouseRepository.find({
      relations: ['PoultryBatches', 'FrozenPoultryInventories'],
    });
  }
}
