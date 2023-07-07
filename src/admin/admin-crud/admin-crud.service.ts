import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminCrudDto } from './dto/create-admin-crud.dto';
import { UpdateAdminCrudDto } from './dto/update-admin-crud.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtCreateService } from 'src/tools/jwtCreate.service';

@Injectable()
export class AdminCrudService {
  constructor(
    private prisma: PrismaService,
  ) // private jwtCreate: JwtCreateService,
  {}

  async create(createAdminCrudDto: CreateAdminCrudDto) {
    const { email, password, ...info } = createAdminCrudDto;
    const findAdmin = await this.prisma.admin.findFirst({ where: { email } });

    if (findAdmin) {
      throw new HttpException('Admin existing already', HttpStatus.CONFLICT);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const data = await this.prisma.admin.create({
      data: { ...info, password: hashPassword, email },
    });
    // const token = await this.jwtCreate.generate(data);

    return {
      // token,
      data,
    };
  }

  async findAll() {
    const admins = await this.prisma.admin.findMany();

    return admins;
  }

  async findOne(id: number) {
    const findAdmin = await this.prisma.admin.findFirst({ where: { id } });

    if (!findAdmin) {
      throw new HttpException(
        'Current admin is undefined',
        HttpStatus.NOT_FOUND,
      );
    }

    return findAdmin;
  }

  async update(id: number, updateAdminCrudDto: UpdateAdminCrudDto) {
    return `This action updates a #${id} adminCrud`;
  }

  async remove(id: number) {
    const findCurrentAdmin = await this.prisma.admin.findFirst({
      where: { id },
    });

    if (!findCurrentAdmin) {
      throw new HttpException('Admin is undefined', HttpStatus.NOT_FOUND);
    }

    await this.prisma.admin.delete({ where: { id } });
    return {
      message: 'Admin removed',
    };
  }
}
