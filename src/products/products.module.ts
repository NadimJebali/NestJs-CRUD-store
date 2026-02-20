import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Tag } from '../tags/entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Tag])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
