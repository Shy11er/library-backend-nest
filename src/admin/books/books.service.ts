import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    // const [firstname, secondname] = createBookDto.author.split(' ');
    const authorId = parseInt(createBookDto.author);
    const findAuthor = await this.prisma.author.findFirst({
      where: { id: authorId },
    });

    if (!findAuthor) {
      throw new HttpException('Author is undefined', HttpStatus.NOT_FOUND);
    }
    const data = await this.prisma.book.create({ data: createBookDto });

    await this.prisma.author.update({
      where: { id: authorId },
      data: { books: [...findAuthor.books, createBookDto.title] },
    });

    return {
      data,
    };
  }

  async findAll() {
    const findBooks = await this.prisma.book.findMany();

    return {
      findBooks,
    };
  }

  async findOne(id: number) {
    const findBook = await this.prisma.book.findFirst({ where: { id } });

    if (!findBook) {
      throw new HttpException('Book is undefined', HttpStatus.NOT_FOUND);
    }

    return {
      findBook,
    };
  }

  async findOneByAuthor(author: string) {
    const findBooks = await this.prisma.book.findMany({ where: { author } });

    if (!findBooks) {
      throw new HttpException('Books undefined', HttpStatus.NOT_FOUND);
    }

    return findBooks;
  }

  async findOneByTitle(title: string) {
    const findBooks = await this.prisma.book.findMany({ where: { title } });

    if (!findBooks) {
      throw new HttpException('Books undefined', HttpStatus.NOT_FOUND);
    }

    return findBooks;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const { title, author } = updateBookDto;
    const findBook = await this.prisma.book.findFirst({ where: { id } });

    if (title === findBook.title && author === findBook.author) {
      throw new HttpException(
        'Enter changes for update book',
        HttpStatus.NOT_MODIFIED,
      );
    }

    return await this.prisma.book.update({
      where: { id },
      data: {
        title,
        author,
      },
    });
  }

  async remove(id: number) {
    const findBook = await this.prisma.book.findFirst({ where: { id } });

    if (!findBook) {
      throw new HttpException('User is undefined', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.book.delete({ where: { id } });
  }
}
