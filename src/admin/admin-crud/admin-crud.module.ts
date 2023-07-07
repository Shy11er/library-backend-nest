import { Module } from '@nestjs/common';
import { AdminCrudService } from './admin-crud.service';
import { AdminCrudController } from './admin-crud.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
// import { JwtCreateService } from 'src/tools/jwtCreate.service';

@Module({
  // exports: [JwtService, PrismaService],
  controllers: [AdminCrudController],
  providers: [AdminCrudService, PrismaService, JwtService],
})
export class AdminCrudModule {}
