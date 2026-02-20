import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
