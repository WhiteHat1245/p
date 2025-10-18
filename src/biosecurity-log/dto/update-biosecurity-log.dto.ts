import { PartialType } from '@nestjs/mapped-types';
import { CreateBiosecurityLogDto } from './create-biosecurity-log.dto';

export class UpdateBiosecurityLogDto extends PartialType(
  CreateBiosecurityLogDto,
) {}
