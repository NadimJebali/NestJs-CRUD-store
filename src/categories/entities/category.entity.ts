import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Stores } from '../../stores/entities/stores.entity';

@Entity({ name: 'categories' })
export class Category {
  @ApiProperty({
    description: 'The unique identifier for the category',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'A description of the category',
    example: 'Electronic devices and accessories',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'The ID of the store this category belongs to',
    example: 1,
    required: false,
  })
  @Column({ nullable: true })
  store_id: number;

  @ApiProperty({
    description: 'The date when the category was created',
    example: '2026-02-14T10:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the category was last updated',
    example: '2026-02-14T10:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'The subcategories belonging to this category',
    type: () => [Subcategory],
  })
  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @ApiProperty({
    description: 'The store this category belongs to',
    type: () => Stores,
  })
  @ManyToOne(() => Stores, (store) => store.categories)
  @JoinColumn({ name: 'store_id' })
  store: Stores;
}
