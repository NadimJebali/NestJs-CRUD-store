import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoriesRepository: Repository<Subcategory>,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const subcategory =
      this.subcategoriesRepository.create(createSubcategoryDto);
    return this.subcategoriesRepository.save(subcategory);
  }

  findAll() {
    return this.subcategoriesRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    const subcategory = await this.subcategoriesRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!subcategory) {
      throw new Error('Subcategory not found');
    }
    return subcategory;
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    const subcategory = await this.findOne(id);
    if (!subcategory) {
      throw new Error('Subcategory not found');
    }
    Object.assign(subcategory, updateSubcategoryDto);
    return this.subcategoriesRepository.save(subcategory);
  }

  remove(id: number) {
    return this.subcategoriesRepository.delete(id);
  }
}
