import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { EmployeeController } from './employee.controller';

// استيراد مستلمات الأوامر
import { CreateEmployeeHandler } from './commands/handlers/create-employee.handler';
import { UpdateEmployeeHandler } from './commands/handlers/update-employee.handler';
import { RemoveEmployeeHandler } from './commands/handlers/remove-employee.handler';

// استيراد مستلمات الاستعلامات
import { GetEmployeeHandler } from './queries/handlers/get-employee.handler';
import { GetEmployeesHandler } from './queries/handlers/get-employees.handler';
import { Employee } from 'src/Core Models/Employee ';

const CommandHandlers = [CreateEmployeeHandler, UpdateEmployeeHandler, RemoveEmployeeHandler];
const QueryHandlers = [GetEmployeeHandler, GetEmployeesHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), CqrsModule],
  controllers: [EmployeeController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class EmployeeModule {}