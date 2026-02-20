import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Stores } from '../../stores/entities/stores.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { Category } from '../../categories/entities/category.entity';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    description: 'The unique identifier for the product',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'A detailed description of the product',
    example: 'High-performance laptop with 16GB RAM',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  @Column()
  price: number;

  @ApiProperty({
    description: 'The quantity of the product in stock',
    example: 50,
  })
  @Column()
  stock_quantity: number;

  @ApiProperty({
    description: 'The ID of the store that sells this product',
    example: 1,
  })
  @Column()
  store_id: number;

  @ApiProperty({
    description: 'The ID of the category this product belongs to',
    example: 1,
    required: false,
  })
  @Column({ nullable: true })
  category_id: number;

  @ApiProperty({
    description: 'The ID of the subcategory this product belongs to',
    example: 1,
    required: false,
  })
  @Column({ nullable: true })
  subcategory_id: number;

  @ApiProperty({
    description: 'The store that this product belongs to',
    type: () => Stores,
  })
  @ManyToOne(() => Stores, (store) => store.products)
  @JoinColumn({ name: 'store_id' })
  store: Stores;

  @ApiProperty({
    description: 'The category this product belongs to',
    type: () => Category,
  })
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty({
    description: 'The subcategory this product belongs to',
    type: () => Subcategory,
  })
  @ManyToOne(() => Subcategory)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: Subcategory;

  @ApiProperty({
    description: 'The date when the product was created',
    example: '2026-02-14T10:00:00Z',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'The date when the product was last updated',
    example: '2026-02-14T10:00:00Z',
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    description: 'URL or path to the product display image',
    example: 'https://example.com/product.jpg',
    nullable: true,
  })
  @Column({ nullable: true })
  display_image: string;

  @ApiProperty({
    description: 'The tags associated with this product',
    type: () => [Tag],
  })
  @ManyToMany(() => Tag, (tag) => tag.products)
  @JoinTable({
    name: 'product_tags',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
