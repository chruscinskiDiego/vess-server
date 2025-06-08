import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { SampleLocationService } from './sample_location.service';
import { UpdateSampleLocationDto } from './dto/update-sample_location.dto';

@Controller('sample-location')
export class SampleLocationController {
  constructor(private readonly sampleLocationService: SampleLocationService) {}

  @Get()
  findAll() {
    return this.sampleLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleLocationDto: UpdateSampleLocationDto) {
    return this.sampleLocationService.update(+id, updateSampleLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleLocationService.remove(+id);
  }
}
