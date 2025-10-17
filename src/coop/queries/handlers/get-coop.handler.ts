import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetCoopQuery } from '../impl/get-coop.query';
import { Coop } from 'src/Core Models/Coop';

@QueryHandler(GetCoopQuery)
export class GetCoopHandler implements IQueryHandler<GetCoopQuery> {
  constructor(
    @InjectRepository(Coop)
    private readonly coopRepository: Repository<Coop>,
  ) {}

  async execute(query: GetCoopQuery): Promise<Coop> {
    const { coopId } = query;
    const coop = await this.coopRepository.findOne({
      where: { CoopID: coopId },
    });
    if (!coop) {
      throw new NotFoundException(`Coop with ID ${coopId} not found`);
    }
    return coop;
  }
}
