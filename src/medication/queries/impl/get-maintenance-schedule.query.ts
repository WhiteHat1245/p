import { IQuery } from '@nestjs/cqrs';

export class GetMaintenanceScheduleQuery implements IQuery {
  constructor(public readonly id: number) {}
}