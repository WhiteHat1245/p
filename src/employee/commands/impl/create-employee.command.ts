import { CreateEmployeeDto } from "src/employee/dto/create-employee.dto.ts/create-employee.dto.ts";

export class CreateEmployeeCommand {
  constructor(public readonly createEmployeeDto: CreateEmployeeDto) {}
}
