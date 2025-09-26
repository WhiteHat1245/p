// في ملف: src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Poultry } from './Core Models/Poultry';
import { Breed } from './Core Models/Breed';
import { Coop } from './Core Models/Coop';
import { Farm } from './Core Models/Farm';
import { EggProduction } from './Core Models/EggProduction';
import { FrozenPoultryInventory } from './Core Models/FrozenPoultryInventory';
import { SpoilageLoss } from './Core Models/SpoilageLoss';
import { InventoryTakeDetail } from './Core Models/InventoryTakeDetail';
import { Feed } from './Core Models/Feed';
import { Medication } from './Core Models/Medication';
import { FeedConsumption } from './Core Models/FeedConsumption';
import { Mortality } from './Core Models/Mortality';
import { TreatmentSchedule } from './Core Models/TreatmentSchedule';
import { Purchase } from './Core Models/Purchase ';
import { PurchaseReturn } from './Core Models/PurchaseReturn';
import { PurchaseReturnDetail } from './Core Models/PurchaseReturnDetail';
import { Sale } from './Core Models/Sale ';
import { SalesReturn } from './Core Models/SalesReturn';
import { SalesReturnDetail } from './Core Models/SalesReturnDetail';
import { Supplier } from './Core Models/Supplier';
import { Customer } from './Core Models/Customer';
import { User } from './Core Models/User';
import { Role } from './Core Models/Role';
import { Employee } from './Core Models/Employee ';
import { Expense } from './Core Models/Expense';
import { PaymentMethod } from './Core Models/PaymentMethod';
import { Payment } from './Core Models/Payment';
import { Debt } from './Core Models/Debt';
import { GeneralLedger } from './Core Models/GeneralLedger';
import { ChartOfAccounts } from './Core Models/ChartOfAccounts ';
import { VaccinationSchedule } from './Core Models/VaccinationSchedule';
import { HealthLog } from './Core Models/HealthLog';
import { Attendance } from './Core Models/Attendance';
import { Payroll } from './Core Models/Payroll';
import { DailyReport } from './Core Models/DailyReport';
import { PerformanceMetric } from './Core Models/PerformanceMetric';
import { Equipment } from './Core Models/Equipment';
import { MaintenanceSchedule } from './Core Models/MaintenanceSchedule';
import { BiosecurityLog } from './Core Models/BiosecurityLog';
import { QualityControl } from './Core Models/QualityControl';
import { FinancialTransaction } from './Core Models/FinancialTransaction';
import { PoultryBatch } from './Core Models/PoultryBatch';
import { EggInventory } from './Core Models/EggInventory';

import { Receipt } from './Core Models/Receipt';
import { PoultryModule } from './poultry/poultry.module';
import { SaleModule } from './sale/sale.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { FarmModule } from './farm/farm.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PurchaseDetail } from './Core Models/purchase-detail';
import { SupplierModule } from './supplier/supplier.module';
import { HealthLogModule } from './health-log/health-log.module';
import { BreedModule } from './breed/breed.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { DailyReportModule } from './DailyReport/DailyReport.Module';
import { DebtModule } from './Debt/debt.module';
import { EggInventoryModule } from './EggInventory/EggInventory.Module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',  // أو اسم الخادم الخاص بك
      port: 5432,         // المنفذ الافتراضي لـ PostgreSQL
      username: 'Zafer', // اسم المستخدم الخاص بك
      password: 'zafer4519932093', // كلمة المرور الخاصة بك
      database: 'poultry_farm_db', // اسم قاعدة البيانات
      synchronize: true,  // **هام:** قم بتغيير هذا إلى false في بيئة الإنتاج
      entities: [
        Poultry, Breed, Coop, Farm, EggProduction, FrozenPoultryInventory, SpoilageLoss, 
        InventoryTakeDetail, Feed, Medication, FeedConsumption, Mortality, TreatmentSchedule, 
        Purchase, PurchaseReturn, PurchaseReturnDetail, Sale, SalesReturn, SalesReturnDetail, 
        Supplier, Customer, User, Role, Employee, Expense, PaymentMethod, Payment, Debt, 
        GeneralLedger, ChartOfAccounts, VaccinationSchedule, HealthLog, Attendance, Payroll, 
        DailyReport, PerformanceMetric, Equipment, MaintenanceSchedule, BiosecurityLog, 
        QualityControl, FinancialTransaction, PoultryBatch, EggInventory, Receipt,PurchaseDetail
      ],
    }),
    PoultryModule,
    SaleModule,
    CustomerModule,
    EmployeeModule,
    FarmModule,
    PurchaseModule,
    SupplierModule,
    HealthLogModule,
    BreedModule,
    VaccineModule,
    DailyReportModule,
    DebtModule, 
    EggInventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}