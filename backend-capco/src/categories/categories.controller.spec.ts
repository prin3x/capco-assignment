import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all available categories', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(result.length).toEqual(4);
  });

  it('should get a category by id', async () => {
    const result = await controller.findOne('5f0e2f5b1a7c8f0b8c7b5a9a');
    expect(result).not.toBeDefined();

    const realResult = await controller.findOne('ojaskldfnauiosfhg');
    expect(realResult).toBeDefined();
    expect(realResult.name).toEqual('news');
  });
});
