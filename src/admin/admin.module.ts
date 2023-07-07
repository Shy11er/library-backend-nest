import { RouterModule, Routes } from '@nestjs/core';
import { AdminCrudModule } from './admin-crud/admin-crud.module';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthorModule } from './author/author.module';

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
      {
        path: '/books',
        module: BooksModule,
      },
      {
        path: '/authors',
        module: AuthorModule,
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
    BooksModule,
    AuthorModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AdminModule {}
