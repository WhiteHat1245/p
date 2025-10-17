// src/slaughterhouse/queries/handlers/get-slaughterhouse.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetSlaughterhouseQuery } from '../impl/get-slaughterhouse.query';
import { Slaughterhouse } from 'src/Core Models/slaughterhouse';

@QueryHandler(GetSlaughterhouseQuery)
export class GetSlaughterhouseHandler
  implements IQueryHandler<GetSlaughterhouseQuery>
{
  constructor(
    @InjectRepository(Slaughterhouse)
    private readonly slaughterhouseRepository: Repository<Slaughterhouse>,
  ) {}

  async execute(query: GetSlaughterhouseQuery): Promise<Slaughterhouse> {
    const { slaughterhouseId } = query;
    const slaughterhouse = await this.slaughterhouseRepository.findOne({
      where: { SlaughterhouseID: slaughterhouseId },
      relations: ['PoultryBatches', 'FrozenPoultryInventories'],
    });
    if (!slaughterhouse) {
      throw new NotFoundException(
        `Slaughterhouse with ID ${slaughterhouseId} not found`,
      );
    }
    return slaughterhouse;
  }
}
