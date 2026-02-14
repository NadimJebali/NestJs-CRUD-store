import { PartialType } from '@nestjs/mapped-types';
import { CreateStoresDto } from './create-stores.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateStoresDto extends PartialType(CreateStoresDto) {
  @ApiProperty({
    description: 'The name of the store',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The physical address of the store',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'A description of the store',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
