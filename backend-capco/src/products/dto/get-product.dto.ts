import { IsString, IsEnum, IsOptional, IsNumberString } from 'class-validator';
import { EProductCategory } from '../entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetProductDto {
  @ApiProperty({
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    enum: EProductCategory,
    required: false
  })
  @IsOptional()
  @IsEnum(EProductCategory)
  category: EProductCategory;


  @ApiProperty({
    type: Number,
    required: false
  })
  @IsOptional()
  @IsNumberString()
  page: number;


  @ApiProperty({
    type: Number,
    required: false
  })
  @IsOptional()
  @IsNumberString()
  limit: number;
}
