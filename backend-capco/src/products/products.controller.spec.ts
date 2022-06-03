import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import {
  EProductCategory,
} from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const query: GetProductDto = {
    page: 1,
    limit: 10,
    category: EProductCategory.NEWS,
    search: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 10 products', async () => {
    expect((await controller.getProducts(query)).items).toHaveLength(10);
  });

  it('should return regoin category', async () => {
    query.category = EProductCategory.REGIONS;

    expect((await controller.getProducts(query)).items[0].category).toMatch(
      EProductCategory.REGIONS,
    );
  });

  it('should return search', async () => {
    query.category = EProductCategory.NEWS;
    query.search = 'comcast';

    expect((await controller.getProducts(query)).items[0].title).toEqual(
      'Comcast Corporation',
    );
  });

  it('should create new product', async () => {
    const _id = new Date().getTime().toString();
    const product: CreateProductDto = {
      title: 'CRolnaldo',
      category: EProductCategory.NEWS,
      image: 'test',
      description: 'test',
    };
    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve({ ...product, _id }));
    const result = await controller.create(product);
    expect(service.create).toBeCalled();

    expect(result).toStrictEqual({ ...product, _id });
  });

  it('should update product by id', async () => {
    const _id = new Date().getTime().toString();
    const product: CreateProductDto = {
      title: 'CRolnaldo',
      category: EProductCategory.NEWS,
      image: 'test',
      description: 'test',
    };
    jest
      .spyOn(service, 'update')
      .mockImplementation(() => Promise.resolve({ ...product, _id }));
    const result = await controller.update(_id, product);
    expect(service.update).toBeCalled();

    expect(result).toStrictEqual({ ...product, _id });
  });
});
