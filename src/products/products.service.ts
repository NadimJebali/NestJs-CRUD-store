import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { tag_ids, ...productData } = createProductDto;
    const product = this.productRepository.create(productData);

    if (tag_ids && tag_ids.length > 0) {
      product.tags = await this.tagRepository.findBy({ id: In(tag_ids) });
    }

    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({
      relations: ['store', 'tags', 'category', 'subcategory'],
    });
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['store', 'tags', 'category', 'subcategory'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }

    const { tag_ids, ...productData } = updateProductDto;
    Object.assign(product, productData);

    if (tag_ids !== undefined) {
      if (tag_ids.length > 0) {
        product.tags = await this.tagRepository.findBy({ id: In(tag_ids) });
      } else {
        product.tags = [];
      }
    }

    return this.productRepository.save(product);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
