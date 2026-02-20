import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A description of the category',
    example: 'Electronic devices and accessories',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The ID of the store this category belongs to',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  store_id?: number;
}
