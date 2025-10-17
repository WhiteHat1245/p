import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from '../create-employee.dto.ts/create-employee.dto.ts';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
