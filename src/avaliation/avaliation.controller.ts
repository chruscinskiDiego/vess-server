import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AvaliationService } from './avaliation.service';
import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.params';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@UseGuards(AuthTokenGuard)
@Controller('avaliation')
export class AvaliationController {
  constructor(private readonly avaliationService: AvaliationService) {}

  @Post()
  async create(@Body() createAvaliationDto: CreateAvaliationDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {

    return await this.avaliationService.createAvaliation(createAvaliationDto, tokenPayload);

  }

  @Get('history-by-user/:id')
  async findAll(@Param('id', ParseIntPipe) id: number, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {

    return await this.avaliationService.findAvaliationHistoryByUser(id, tokenPayload);
    
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {

    return await this.avaliationService.findOneAvaliationById(id, tokenPayload);

  }

}
