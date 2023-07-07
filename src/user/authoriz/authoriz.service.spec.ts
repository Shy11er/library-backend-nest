import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizService } from './authoriz.service';

describe('AuthorizService', () => {
  let service: AuthorizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizService],
    }).compile();

    service = module.get<AuthorizService>(AuthorizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
