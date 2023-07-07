import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorizModule } from './authoriz/authoriz.module';

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: '/users',
        module: AuthModule,
      },
      {
        path: '/auth',
        module: AuthorizModule,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.register(routes), AuthModule, AuthorizModule],
  controllers: [],
  providers: [PrismaService],
})
export class UserModule {}
