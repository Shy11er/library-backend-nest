import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtCreateService } from 'src/tools/jwtCreate.service';
import { AdminLoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtCreateService: JwtCreateService,
  ) {}

  async login(dto: AdminLoginDto) {
    const admin = await this.prisma.admin.findFirst({
      where: { email: dto.email },
    });

    if (!admin) {
      throw new HttpException('Admin is undefined', HttpStatus.NOT_FOUND);
    }

    const validPassword = bcrypt.compare(dto.password, admin.password);
    if (!validPassword) {
      throw new HttpException(
        'Wromg password or email',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.jwtCreateService.generate(admin);
    return { ...token };
  }
}
