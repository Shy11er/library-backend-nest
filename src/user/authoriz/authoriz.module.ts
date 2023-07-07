import { Module } from '@nestjs/common';
import { AuthorizService } from './authoriz.service';
import { AuthorizController } from './authoriz.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuthorizController],
  providers: [AuthorizService, PrismaService],
})
export class AuthorizModule {}
