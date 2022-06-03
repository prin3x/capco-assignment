import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import * as fs from 'fs';
import { join } from 'path';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  async create(createCategoryDto: CreateCategoryDto) {
    let res: Category;
    try {
      const categories: Category[] = await this.getDataFromJson();
      if (!categories) {
        throw new NotFoundException('No categories found');
      }

      const _id = new Date().getTime().toString();
      categories.push({ ...createCategoryDto, _id });

      await this.writeData(categories);

      res = categories[categories.length - 1];
    } catch (e) {
      throw new InternalServerErrorException('Server error');
    }
    return res;
  }

  async findAll(): Promise<Category[]> {
    let res: Category[] = [];
    try {
      const categories: Category[] = await this.getDataFromJson();
      if (!categories) {
        throw new NotFoundException('No categories found');
      }
      res = categories;
    } catch (e) {
      throw new InternalServerErrorException('Server error');
    }
    return res;
  }

  async findOne(id: string): Promise<Category> {
    let res;
    try {
      const categories: Category[] = await this.getDataFromJson();

      res = categories.find((_cate) => _cate._id === id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    return res;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let res;
    try {
      const categories: Category[] = await this.getDataFromJson();

      const targetCategory = categories.find(
        (_category) => _category._id === id,
      );

      if (!targetCategory)
        throw new NotFoundException('This Category is not found');

      targetCategory.name = updateCategoryDto.name || targetCategory.name;

      await this.writeData(categories);

      res = targetCategory;
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    return res;
  }

  async remove(id: string) {
    let res;
    try {
      const categories: Category[] = await this.getDataFromJson();

      const targetCategory = categories.find(
        (_category) => _category._id === id,
      );

      if (!targetCategory)
        throw new NotFoundException('This Category is not found');

      await this.writeData(categories);
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    return res;
  }

  getDataFromJson(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        join(process.cwd(), '/src/categories/data/categories.json'),
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

  writeData(products: Category[]): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        join(process.cwd(), '/src/categories/data/categories.json'),
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
