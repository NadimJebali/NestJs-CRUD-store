import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
