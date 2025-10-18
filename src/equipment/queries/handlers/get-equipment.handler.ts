// src/equipment/queries/handlers/get-equipment.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetEquipmentQuery } from '../impl/get-equipment.query';
import { Equipment } from 'src/Core Models/Equipment';

@QueryHandler(GetEquipmentQuery)
export class GetEquipmentHandler implements IQueryHandler<GetEquipmentQuery> {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async execute(query: GetEquipmentQuery): Promise<Equipment> {
    const { equipmentId } = query;
    const equipment = await this.equipmentRepository.findOne({
      where: { EquipmentID: equipmentId },
      relations: ['MaintenanceSchedules'],
    });
    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${equipmentId} not found`);
    }
    return equipment;
  }
}
