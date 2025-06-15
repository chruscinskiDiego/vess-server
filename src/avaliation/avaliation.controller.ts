import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AvaliationService } from './avaliation.service';
import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';

@UseGuards(AuthTokenGuard)
@Controller('avaliation')
export class AvaliationController {
  constructor(private readonly avaliationService: AvaliationService) {}

  @Post()
  async create(@Body() createAvaliationDto: CreateAvaliationDto) {
    return await this.avaliationService.createAvaliation(createAvaliationDto);
  }

  @Get('history-by-user/:id')
  async findAll(@Param('id', ParseIntPipe) id: number) {

    return await this.avaliationService.findAvaliationHistoryByUser(id);
    
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {

    return await this.avaliationService.findOneAvaliationById(id);

  }

}
