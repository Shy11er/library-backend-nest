import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/auth.dto';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Admin authorization' })
  @ApiResponse({ status: 200, description: 'Successful authorization' })
  @ApiResponse({ status: 403, description: 'Failed with authorization' })
  @HttpCode(200)
  @Post('/login')
  create(@Body() loginDto: AdminLoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
