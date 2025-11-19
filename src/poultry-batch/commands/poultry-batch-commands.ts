import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePoultryBatchDto } from '../dto/create-poultry-batch.dto';

export class CreatePoultryBatchCommand {
  constructor(public readonly createPoultryBatchDto: CreatePoultryBatchDto) {}
}

@CommandHandler(CreatePoultryBatchCommand)
export class CreatePoultryBatchHandler
  implements ICommandHandler<CreatePoultryBatchCommand>
{
  constructor() {}

  async execute(command: CreatePoultryBatchCommand): Promise<any> {
    console.log(command);
    return {};
  }
}