import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AvaliationService } from './avaliation.service';
import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { UpdateAvaliationDto } from './dto/update-avaliation.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';

@UseGuards(AuthTokenGuard)
@Controller('avaliation')
export class AvaliationController {
  constructor(private readonly avaliationService: AvaliationService) {}

  @Post()
  async create(@Body() createAvaliationDto: CreateAvaliationDto) {
    return this.avaliationService.createAvaliation(createAvaliationDto);
  }

  @Get()
  findAll() {
    return this.avaliationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avaliationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvaliationDto: UpdateAvaliationDto) {
    return this.avaliationService.update(+id, updateAvaliationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avaliationService.remove(+id);
  }
}
