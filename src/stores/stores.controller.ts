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
import { StoresService } from './stores.service';
import { CreateStoresDto } from './dto/create-stores.dto';
import { UpdateStoresDto } from './dto/update-stores.dto';
import { Stores } from './entities/stores.entity';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new store' })
  @ApiBody({ type: CreateStoresDto })
  @ApiResponse({
    status: 201,
    description: 'Store created successfully',
    type: Stores,
  })
  create(@Body() createStoresDto: CreateStoresDto) {
    return this.storesService.create(createStoresDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stores' })
  @ApiResponse({
    status: 200,
    description: 'List of all stores',
    type: [Stores],
  })
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a store by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Store ID' })
  @ApiResponse({
    status: 200,
    description: 'Store found',
    type: Stores,
  })
  @ApiResponse({
    status: 404,
    description: 'Store not found',
  })
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a store' })
  @ApiParam({ name: 'id', type: Number, description: 'Store ID' })
  @ApiBody({ type: UpdateStoresDto })
  @ApiResponse({
    status: 200,
    description: 'Store updated successfully',
    type: Stores,
  })
  update(@Param('id') id: string, @Body() updateStoresDto: UpdateStoresDto) {
    return this.storesService.update(+id, updateStoresDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a store' })
  @ApiParam({ name: 'id', type: Number, description: 'Store ID' })
  @ApiResponse({
    status: 200,
    description: 'Store deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
