import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SampleLayersService } from './sample_layers.service';
import { sampleLayerDto } from './dto/create-sample_layer.dto';
import { UpdateSampleLayerDto } from './dto/update-sample_layer.dto';

@Controller('sample-layers')
export class SampleLayersController {
  constructor(private readonly sampleLayersService: SampleLayersService) {}

  @Get()
  findAll() {
    return this.sampleLayersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleLayersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleLayerDto: UpdateSampleLayerDto) {
    return this.sampleLayersService.update(+id, updateSampleLayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleLayersService.remove(+id);
  }

}
