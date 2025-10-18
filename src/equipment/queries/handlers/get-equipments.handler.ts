// src/equipment/queries/handlers/get-equipments.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetEquipmentsQuery } from '../impl/get-equipments.query';
import { Equipment } from 'src/Core Models/Equipment';

@QueryHandler(GetEquipmentsQuery)
export class GetEquipmentsHandler implements IQueryHandler<GetEquipmentsQuery> {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async execute(): Promise<Equipment[]> {
    return this.equipmentRepository.find({
      relations: ['MaintenanceSchedules'],
    });
  }
}
