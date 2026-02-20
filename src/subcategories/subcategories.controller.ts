import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@ApiTags('subcategories')
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subcategory' })
  @ApiBody({ type: CreateSubcategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Subcategory created successfully',
    type: Subcategory,
  })
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subcategories' })
  @ApiResponse({
    status: 200,
    description: 'List of all subcategories',
    type: [Subcategory],
  })
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subcategory by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the subcategory',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Subcategory retrieved successfully',
    type: Subcategory,
  })
  @ApiResponse({
    status: 404,
    description: 'Subcategory not found',
  })
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a subcategory' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the subcategory',
    example: 1,
  })
  @ApiBody({ type: UpdateSubcategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Subcategory updated successfully',
    type: Subcategory,
  })
  @ApiResponse({
    status: 404,
    description: 'Subcategory not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.subcategoriesService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subcategory' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the subcategory',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Subcategory deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(+id);
  }
}
