import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll() {
    return this.categoriesRepository.find({
      relations: ['subcategories', 'store'],
    });
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['subcategories', 'store'],
    });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) {
      throw new Error('Category not found');
    }
    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  remove(id: number) {
    return this.categoriesRepository.delete(id);
  }
}
