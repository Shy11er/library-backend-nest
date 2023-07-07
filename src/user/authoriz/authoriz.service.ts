import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorizDto } from './dto/create-authoriz.dto';
import { UpdateAuthorizDto } from './dto/update-authoriz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorizService {
  constructor(private prisma: PrismaService) {}

  async login(createAuthorizDto: CreateAuthorizDto) {
    const { password, email } = createAuthorizDto;

    if (!password || !email) {
      throw new HttpException('Enter password or email', HttpStatus.CONFLICT);
    }
    const findUser = await this.prisma.user.findFirst({ where: { email } });
    if (!findUser) {
      throw new HttpException('User is undefined', HttpStatus.NOT_FOUND);
    }

    if (findUser.is_blocked) {
      throw new HttpException('User is blocked', HttpStatus.BAD_REQUEST);
    }

    const compared = await bcrypt.compare(password, findUser.password);

    if (compared) {
      return {
        findUser,
      };
    }

    throw new HttpException('Wrong password or email', HttpStatus.UNAUTHORIZED);
  }
}
