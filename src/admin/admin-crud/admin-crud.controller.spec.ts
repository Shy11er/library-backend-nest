import { Test, TestingModule } from '@nestjs/testing';
import { AdminCrudController } from './admin-crud.controller';
import { AdminCrudService } from './admin-crud.service';

describe('AdminCrudController', () => {
  let controller: AdminCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCrudController],
      providers: [AdminCrudService],
    }).compile();

    controller = module.get<AdminCrudController>(AdminCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
