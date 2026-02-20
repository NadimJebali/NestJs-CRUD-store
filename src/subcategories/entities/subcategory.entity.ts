import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'subcategories' })
export class Subcategory {
  @ApiProperty({
    description: 'The unique identifier for the subcategory',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The name of the subcategory',
    example: 'Laptops',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'A description of the subcategory',
    example: 'Portable computers',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'The ID of the category this subcategory belongs to',
    example: 1,
  })
  @Column()
  category_id: number;

  @ApiProperty({
    description: 'The date when the subcategory was created',
    example: '2026-02-14T10:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the subcategory was last updated',
    example: '2026-02-14T10:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'The category this subcategory belongs to',
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
