import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ECategory } from '../entities/category.entity';

export class CreateCategoryDto {
  @ApiProperty({
    enum: ECategory,
    required: true,
  })
  @IsEnum(ECategory)
  name: ECategory;
}
