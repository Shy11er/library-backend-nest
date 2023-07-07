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
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('Main')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    try {
      return this.authService.create(createAuthDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get()
  findAll() {
    try {
      return this.authService.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.authService.findOne(+id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    try {
      return this.authService.update(+id, updateAuthDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.authService.remove(+id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
