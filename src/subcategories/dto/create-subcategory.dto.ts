import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubcategoryDto {
  @ApiProperty({
    description: 'The name of the subcategory',
    example: 'Laptops',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A description of the subcategory',
    example: 'Portable computers',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The ID of the category this subcategory belongs to',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
