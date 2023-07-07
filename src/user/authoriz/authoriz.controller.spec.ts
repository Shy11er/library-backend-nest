import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizController } from './authoriz.controller';
import { AuthorizService } from './authoriz.service';

describe('AuthorizController', () => {
  let controller: AuthorizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorizController],
      providers: [AuthorizService],
    }).compile();

    controller = module.get<AuthorizController>(AuthorizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
