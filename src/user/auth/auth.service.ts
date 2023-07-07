import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthDto: CreateAuthDto) {
    const { email, password, ...info } = createAuthDto;
    const findUser = await this.prisma.user.findFirst({ where: { email } });

    if (findUser) {
      throw new HttpException(
        'The user with same email is existing already',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await this.prisma.user.create({
      data: { ...info, password: hashedPassword, email },
    });

    return {
      data,
    };
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany();

    return allUsers;
  }

  async findOne(id: number) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!findUser) {
      throw new HttpException('This user is undefined', HttpStatus.NOT_FOUND);
    }

    if (findUser.is_blocked) {
      throw new HttpException('This user is blocked', HttpStatus.FORBIDDEN);
    }

    return findUser;
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const findUser = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!findUser) {
      throw new HttpException('This user is undefined', HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.delete({ where: { id } });

    return {
      message: 'Successful user deleting',
    };
  }
}
