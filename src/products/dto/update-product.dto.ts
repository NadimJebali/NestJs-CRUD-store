import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A detailed description of the product',
    example: 'High-performance laptop with 16GB RAM',
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
    description: 'URL or path to the product display image',
    example: 'https://example.com/product.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  display_image?: string;
}
