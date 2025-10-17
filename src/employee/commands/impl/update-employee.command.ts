import { UpdateEmployeeDto } from 'src/employee/dto/update-employee.dto.ts/update-employee.dto.ts';

export class UpdateEmployeeCommand {
  constructor(
    public readonly id: number,
    public readonly updateEmployeeDto: UpdateEmployeeDto,
  ) {}
}
