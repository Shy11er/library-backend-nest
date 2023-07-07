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
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User creating' })
  @ApiResponse({ status: 200, description: 'Successful creating of user' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 409, description: 'User is existing' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({ summary: 'Users getting' })
  @ApiResponse({ status: 200, description: 'Successful getting all users' })
  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({ summary: 'User getting by id' })
  @ApiResponse({ status: 200, description: 'Successful getting of user' })
  @ApiResponse({ status: 404, description: 'User is undefined' })
  @ApiResponse({ status: 406, description: 'ID is not a number' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(+id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({ summary: 'User updating' })
  @ApiResponse({ status: 200, description: 'User is updated' })
  @ApiResponse({ status: 404, description: 'User is undefined' })
  @ApiResponse({ status: 406, description: 'ID is not a number' })
  @ApiResponse({ status: 409, description: 'User is existing' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(+id, updateUserDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({ summary: 'User removing' })
  @ApiResponse({ status: 200, description: 'User removed' })
  @ApiResponse({ status: 404, description: 'User is undefined' })
  @ApiResponse({ status: 406, description: 'ID is not a number' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(+id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
