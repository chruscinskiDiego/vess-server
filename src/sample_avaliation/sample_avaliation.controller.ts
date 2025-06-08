import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SampleAvaliationService } from './sample_avaliation.service';
import { sampleAvaliationDto } from './dto/create-sample_avaliation.dto';


@Controller('sample-avaliation')
export class SampleAvaliationController {
  constructor(private readonly sampleAvaliationService: SampleAvaliationService) {}

  @Get()
  findAll() {
    return this.sampleAvaliationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleAvaliationService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleAvaliationService.remove(+id);
  }
}
