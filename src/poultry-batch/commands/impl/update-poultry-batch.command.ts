import { UpdatePoultryBatchDto } from '../../dto/update-poultry-batch.dto';

export class UpdatePoultryBatchCommand {
  constructor(
    public readonly id: number,
    public readonly updatePoultryBatchDto: UpdatePoultryBatchDto,
  ) {}
}
