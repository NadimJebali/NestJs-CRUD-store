import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresModule } from './stores/store.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { TagsModule } from './tags/tags.module';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [path.join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    StoresModule,
    ProductsModule,
    CategoriesModule,
    SubcategoriesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
