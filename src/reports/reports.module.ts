import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
})
export class ReportsModule {}
