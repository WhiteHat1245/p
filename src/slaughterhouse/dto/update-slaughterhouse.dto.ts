import { PartialType } from '@nestjs/mapped-types';
import { CreateSlaughterhouseDto } from './create-slaughterhouse.dto';

export class UpdateSlaughterhouseDto extends PartialType(CreateSlaughterhouseDto) {}