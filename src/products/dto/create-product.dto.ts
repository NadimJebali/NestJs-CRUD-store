import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsArray,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A detailed description of the product',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'The quantity of the product in stock',
    example: 50,
  })
  @IsNumber()
  @IsPositive()
  stock_quantity: number;

  @ApiProperty({
    description: 'The ID of the store that sells this product',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  store_id: number;

  @ApiProperty({
    description: 'The ID of the category this product belongs to',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  category_id?: number;

  @ApiProperty({
    description: 'The ID of the subcategory this product belongs to',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  subcategory_id?: number;

  @ApiProperty({
    description: 'URL or path to the product display image',
    example: 'https://example.com/product.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  display_image?: string;

  @ApiProperty({
    description: 'Array of tag IDs to associate with this product',
    example: [1, 2, 3],
    required: false,
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  tag_ids?: number[];
}
