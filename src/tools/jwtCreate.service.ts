import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtCreateService {
  constructor(private jwtService: JwtService) {}

  async generate(data: any) {
    const { id, ...payload } = data;
    return {
      token: await this.jwtService.signAsync({ user_id: id, ...payload }),
    };
  }
}
