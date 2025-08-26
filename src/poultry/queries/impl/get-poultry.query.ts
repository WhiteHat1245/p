import { IQuery } from '@nestjs/cqrs';

export class GetPoultryQuery implements IQuery {
  constructor(public readonly id: number) {}
}
