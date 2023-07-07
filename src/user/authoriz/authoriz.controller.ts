import { Controller, Post, Body } from '@nestjs/common';
import { AuthorizService } from './authoriz.service';
import { CreateAuthorizDto } from './dto/create-authoriz.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthorizController {
  constructor(private readonly authorizService: AuthorizService) {}

  @Post()
  login(@Body() createAuthorizDto: CreateAuthorizDto) {
    return this.authorizService.login(createAuthorizDto);
  }
}
