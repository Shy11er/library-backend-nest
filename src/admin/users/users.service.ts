import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, ...info } = createUserDto;
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

  async update(id: number, updateUserDto: UpdateUserDto) {
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

  async block(id: number) {
    const findUser = await this.prisma.user.findFirst({ where: { id } });

    if (!findUser) {
      throw new HttpException('This user is undefined', HttpStatus.NOT_FOUND);
    }

    if (findUser.is_blocked) {
      throw new HttpException(
        'This user was blocked already',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.prisma.user.update({
      where: { id },
      data: { is_blocked: true },
    });
  }
}
