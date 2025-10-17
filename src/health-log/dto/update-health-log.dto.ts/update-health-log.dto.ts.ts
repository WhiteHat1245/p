import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthLogDto } from '../create-health-log.dto.ts/create-health-log.dto.ts';

export class UpdateHealthLogDto extends PartialType(CreateHealthLogDto) {}
