import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'stores' })
export class Stores {
  @ApiProperty({
    description: 'The unique identifier for the store',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The name of the store',
    example: 'Main Store',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The physical address of the store',
    example: '123 Main Street, City, State',
  })
  @Column()
  address: string;

  @ApiProperty({
    description: 'A description of the store',
    example: 'Our main retail location',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'The date when the store was created',
    example: '2026-02-14T10:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the store was last updated',
    example: '2026-02-14T10:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'List of products in this store',
    type: () => Array,
  })
  @OneToMany(() => Product, (product) => product.store)
  products: Product[];
}
