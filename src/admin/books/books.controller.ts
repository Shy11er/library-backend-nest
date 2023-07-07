import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadGatewayException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { title } from 'process';

// @ApiBearerAuth()
@ApiTags('Books')
@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Book creating' })
  @ApiResponse({ status: 200, description: 'Successful book creating' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 409, description: 'Book is existing' })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    try {
      return this.booksService.create(createBookDto);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @ApiOperation({ summary: 'All books getting' })
  @ApiResponse({ status: 200, description: 'Books getted' })
  @Get()
  findAll() {
    try {
      return this.booksService.findAll();
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @ApiOperation({ summary: 'One book getting' })
  @ApiResponse({ status: 200, description: 'Book getted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Book is undefined' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.booksService.findOne(+id);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @ApiOperation({ summary: 'Books getting by author' })
  @ApiResponse({ status: 200, description: 'Books getted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Books is undefined' })
  @Get('author/:author')
  findByAuthor(@Param('author') author: string) {
    try {
      return this.booksService.findOneByAuthor(author);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @ApiOperation({ summary: 'Books getting by title' })
  @ApiResponse({ status: 200, description: 'Books getted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Books is undefined' })
  @Get('title/:title')
  findByTitle(@Param('title') title: string) {
    try {
      return this.booksService.findOneByTitle(title);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @ApiOperation({ summary: 'Books updating' })
  @ApiResponse({ status: 200, description: 'Books getted' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Books is undefined' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      return this.booksService.update(+id, updateBookDto);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @ApiOperation({ summary: 'Book deleting' })
  @ApiResponse({ status: 200, description: 'Books deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.booksService.remove(+id);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }
}
