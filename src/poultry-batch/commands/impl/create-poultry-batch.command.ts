import { CreatePoultryBatchDto } from '../../dto/create-poultry-batch.dto';

export class CreatePoultryBatchCommand {
  constructor(public readonly createPoultryBatchDto: CreatePoultryBatchDto) {}
}
