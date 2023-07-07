import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const { email, password, ...info } = createAuthorDto;
    const findAuthor = await this.prisma.author.findFirst({ where: { email } });

    if (findAuthor) {
      throw new HttpException(
        'The Author with same email is existing already',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await this.prisma.author.create({
      data: { ...info, password: hashedPassword, email },
    });

    return {
      data,
    };
  }

  async findAll() {
    const findAuthors = await this.prisma.author.findMany();

    return findAuthors;
  }

  async findOne(id: number) {
    const findAuthor = await this.prisma.author.findFirst({
      where: {
        id,
      },
    });

    if (!findAuthor) {
      throw new HttpException('This author is undefined', HttpStatus.NOT_FOUND);
    }

    if (findAuthor.is_blocked) {
      throw new HttpException('This author is blocked', HttpStatus.FORBIDDEN);
    }

    return findAuthor;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const findAuthor = await this.prisma.author.findFirst({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const findAuthor = await this.prisma.author.findFirst({
      where: {
        id,
      },
    });

    if (!findAuthor) {
      throw new HttpException('This author is undefined', HttpStatus.NOT_FOUND);
    }

    await this.prisma.author.delete({ where: { id } });

    return {
      message: 'Successful author deleting',
    };
  }
}
