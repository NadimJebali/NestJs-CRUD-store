import { Injectable } from '@nestjs/common';
import { CreateStoresDto } from './dto/create-stores.dto';
import { UpdateStoresDto } from './dto/update-stores.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stores } from './entities/stores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Stores) private storesRepository: Repository<Stores>,
  ) {}

  async create(createStoresDto: CreateStoresDto) {
    const store = this.storesRepository.create(createStoresDto);
    return this.storesRepository.save(store);
  }

  findAll() {
    return this.storesRepository.find({
      relations: ['products', 'products.tags', 'products.category', 'products.subcategory'],
    });
  }

  async findOne(id: number) {
    const store = await this.storesRepository.findOne({
      where: { id },
      relations: ['products', 'products.tags', 'products.category', 'products.subcategory'],
    });
    if (!store) {
      throw new Error('Store not found');
    }
    return store;
  }

  async update(id: number, updateStoresDto: UpdateStoresDto) {
    const store = await this.findOne(id);
    if (!store) {
      throw new Error('Store not found');
    }
    Object.assign(store, updateStoresDto);
    return this.storesRepository.save(store);
  }

  remove(id: number) {
    return this.storesRepository.delete(id);
  }
}
