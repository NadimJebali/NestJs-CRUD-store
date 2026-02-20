import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(tag);
  }

  findAll() {
    return this.tagsRepository.find({
      relations: ['products'],
    });
  }

  async findOne(id: number) {
    const tag = await this.tagsRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!tag) {
      throw new Error('Tag not found');
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new Error('Tag not found');
    }
    Object.assign(tag, updateTagDto);
    return this.tagsRepository.save(tag);
  }

  remove(id: number) {
    return this.tagsRepository.delete(id);
  }
}
