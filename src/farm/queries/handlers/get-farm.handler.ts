// src/farm/queries/handlers/get-farm.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetFarmQuery } from '../impl/get-farm.query';
import { Farm } from 'src/Core Models/Farm';

@QueryHandler(GetFarmQuery)
export class GetFarmHandler implements IQueryHandler<GetFarmQuery> {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async execute(query: GetFarmQuery): Promise<Farm> {
    const { farmId } = query;
    const farm = await this.farmRepository.findOne({ where: { FarmID: farmId }, relations: ['Coops', 'Employees'] });
    if (!farm) {
      throw new NotFoundException(`Farm with ID ${farmId} not found`);
    }
    return farm;
  }
}