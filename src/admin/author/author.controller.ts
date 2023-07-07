import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Author')
@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: 'Author creating' })
  @ApiResponse({ status: 200, description: 'Successful creating of author' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 409, description: 'Author is existing already' })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    try {
      return this.authorService.create(createAuthorDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({ summary: 'Authors getting' })
  @ApiResponse({ status: 200, description: 'Successful getting all authors' })
  @Get()
  findAll() {
    try {
      return this.authorService.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({ summary: 'Author getting by id' })
  @ApiResponse({ status: 200, description: 'Successful getting of author' })
  @ApiResponse({ status: 403, description: 'Author is blocked' })
  @ApiResponse({ status: 404, description: 'Author is undefined' })
  @ApiResponse({ status: 406, description: 'ID is not a number' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.authorService.findOne(+id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({ summary: 'Author updating' })
  @ApiResponse({ status: 200, description: 'Author is updated' })
  @ApiResponse({ status: 404, description: 'Author is undefined' })
  @ApiResponse({ status: 406, description: 'ID is not a number' })
  @ApiResponse({ status: 409, description: 'Author is existing' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    try {
      return this.authorService.update(+id, updateAuthorDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({ summary: 'Author removing' })
  @ApiResponse({ status: 200, description: 'Author removed' })
  @ApiResponse({ status: 404, description: 'Author is undefined' })
  @ApiResponse({ status: 406, description: 'ID is not a number' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.authorService.remove(+id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
