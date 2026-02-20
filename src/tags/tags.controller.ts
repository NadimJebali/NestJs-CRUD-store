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
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiBody({ type: CreateTagDto })
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully',
    type: Tag,
  })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({
    status: 200,
    description: 'List of all tags',
    type: [Tag],
  })
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tag by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the tag',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Tag retrieved successfully',
    type: Tag,
  })
  @ApiResponse({
    status: 404,
    description: 'Tag not found',
  })
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tag' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the tag',
    example: 1,
  })
  @ApiBody({ type: UpdateTagDto })
  @ApiResponse({
    status: 200,
    description: 'Tag updated successfully',
    type: Tag,
  })
  @ApiResponse({
    status: 404,
    description: 'Tag not found',
  })
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the tag',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Tag deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
