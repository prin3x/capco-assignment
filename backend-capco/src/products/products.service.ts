import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  IBasicPorductQuery,
  IProductQueryReply,
  Product,
} from './entities/product.entity';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  async create(createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log(`fn => ${this.create.name} : create new product`);
    let res: Product = {} as Product;

    const { title, category, image, description } = createProductDto;

    const products: Product[] = await this.getDataFromJson();

    const newProduct: Product = {
      _id: new Date().getTime().toString(),
      title,
      category,
      image,
      description,
    };

    products.push(newProduct);

    res = newProduct;

    this.writeData(products);

    return res;
  }

  async getProducts(q: IBasicPorductQuery): Promise<IProductQueryReply> {
    this.logger.log('This action returns all products');
    let res: IProductQueryReply = {} as IProductQueryReply;

    let { page, limit, category, search }: IBasicPorductQuery =
      this.parseQueryString(q);

    const offset: number = (page - 1) * limit;

    const products: Product[] = await this.getDataFromJson();

    if (!products) throw new NotFoundException();
    res.items = products || [];

    if (category) {
      res.items = products.filter(
        (product: Product) => product.category === category,
      );
    }

    if (search) {
      res.items = res.items.filter(
        (product: Product) =>
          product.title.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search),
      );
    }

    res.total = res.items.length;
    res.items = res.items.slice(offset, offset + limit);

    res.page = +page;

    return res;
  }

  async findOne(id: string) {
    let res;
    try {
      const products: Product[] = await this.getDataFromJson();

      res = products.find((_product) => _product._id === id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    return res;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let res;
    try {
      const products: Product[] = await this.getDataFromJson();

      const targetProduct = products.find((_product) => _product._id === id);

      if (!targetProduct)
        throw new NotFoundException('This product is not found');

      const { title, category, image, description } = updateProductDto;

      targetProduct.title = title || targetProduct.title;
      targetProduct.category = category || targetProduct.category;
      targetProduct.image = image || targetProduct.image;
      targetProduct.description = description || targetProduct.description;

      await this.writeData(products);

      res = targetProduct;
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    return res;
  }

  async remove(id: string) {
    let res;
    try {
      const products: Product[] = await this.getDataFromJson();

      const newProducts = products.filter((_product) => _product._id !== id);

      if (!newProducts)
        throw new NotFoundException('This product is not found');

      await this.writeData(newProducts);

      res = newProducts;
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    return res;
  }

  parseQueryString(q: IBasicPorductQuery): IBasicPorductQuery {
    const rtn: IBasicPorductQuery = {
      _id: q?._id || '',
      page: +q?.page || 1,
      limit: +q?.limit ? (+q?.limit > 100 ? 100 : +q?.limit) : 10,
      category: q?.category,
      search: q?.search?.toLowerCase() || '',
    };

    return rtn;
  }

  getDataFromJson(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        join(process.cwd(), '/src/products/data/products.json'),
        'utf8',
        (err, data) => {
          if (err) {
            return reject(
              reject(
                new Error(
                  `Failed to read Release post: Reason: ${err.message}`,
                ),
              ),
            );
          }

          resolve(JSON.parse(data));
        },
      );
    });
  }

  writeData(products: Product[]): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        join(process.cwd(), '/src/products/data/products.json'),
        JSON.stringify(products, null, 2),
        (err) => {
          if (err) {
            return reject(
              reject(
                new Error(
                  `Failed to write Release post: Reason: ${err.message}`,
                ),
              ),
            );
          }
        },
      );

      return resolve(products);
    });
  }
}
