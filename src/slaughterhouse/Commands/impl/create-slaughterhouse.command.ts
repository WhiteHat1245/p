import { CreateSlaughterhouseDto } from '../../dto/create-slaughterhouse.dto';

export class CreateSlaughterhouseCommand {
  constructor(
    public readonly createSlaughterhouseDto: CreateSlaughterhouseDto,
  ) {}
}
