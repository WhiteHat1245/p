import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetEggProductionQuery } from '../Impl/GetEggProductionQuery';
import { EggProduction } from 'src/Core Models/EggProduction';

@QueryHandler(GetEggProductionQuery)
export class GetEggProductionHandler
  implements IQueryHandler<GetEggProductionQuery>
{
  constructor(
    @InjectRepository(EggProduction)
    private readonly eggProductionRepository: Repository<EggProduction>,
  ) {}

  async execute(query: GetEggProductionQuery): Promise<EggProduction> {
    const { id } = query;
    const production = await this.eggProductionRepository.findOne({
      where: { EggProductionID: id },
      relations: ['Coop'],
    });

    if (!production) {
      throw new NotFoundException(
        `Egg Production record with ID ${id} not found`,
      );
    }
    return production;
  }
}
