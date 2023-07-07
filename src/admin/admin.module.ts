import { RouterModule, Routes } from '@nestjs/core';
import { AdminCrudModule } from './admin-crud/admin-crud.module';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: '/admin',
    children: [
      {
        path: '/admins',
        module: AdminCrudModule,
      },
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/users',
        module: UsersModule,
      },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AdminCrudModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AdminModule {}
