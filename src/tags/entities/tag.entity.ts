import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'tags' })
export class Tag {
  @ApiProperty({
    description: 'The unique identifier for the tag',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The name of the tag',
    example: 'Electronics',
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    description: 'The date when the tag was created',
    example: '2026-02-14T10:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the tag was last updated',
    example: '2026-02-14T10:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'The products associated with this tag',
    type: () => [Product],
  })
  @ManyToMany(() => Product, (product) => product.tags)
  products: Product[];
}
