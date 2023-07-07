import { Test, TestingModule } from '@nestjs/testing';
import { AdminCrudService } from './admin-crud.service';

describe('AdminCrudService', () => {
  let service: AdminCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminCrudService],
    }).compile();

    service = module.get<AdminCrudService>(AdminCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
