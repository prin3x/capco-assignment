import { IsString, IsEnum } from 'class-validator';
import { EProductCategory } from '../entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    enum: EProductCategory,
  })
  @IsEnum(EProductCategory)
  category: EProductCategory;

  @ApiProperty({
    type: String,
  })
  @IsString()
  image: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  description: string;
}
