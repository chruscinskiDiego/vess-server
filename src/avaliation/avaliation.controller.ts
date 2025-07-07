import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AvaliationService } from './avaliation.service';
import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.params';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DOC_AVALIATION_TAG, DOC_BEARER_AUTH, DOC_CREATE_AVALIATION_DESCRIPTION, DOC_CREATE_AVALIATION_SUMMARY, DOC_GET_AVALIATION_BY_ID_DESCRIPTION, DOC_GET_AVALIATION_BY_ID_SUMMARY, DOC_GET_HISTORY_AVALIATION_BY_USER_DESCRIPTION, DOC_GET_HISTORY_AVALIATION_BY_USER_SUMMARY } from 'src/doc/swagger-consts';

@ApiTags(DOC_AVALIATION_TAG)
@ApiBearerAuth('access-token')
@UseGuards(AuthTokenGuard)
@Controller('avaliation')
export class AvaliationController {
  constructor(private readonly avaliationService: AvaliationService) {}

  @ApiBody({type: CreateAvaliationDto, description: DOC_CREATE_AVALIATION_DESCRIPTION})
  @ApiBearerAuth(DOC_BEARER_AUTH)
  @ApiOperation({summary: DOC_CREATE_AVALIATION_SUMMARY})
  @Post()
  async create(@Body() createAvaliationDto: CreateAvaliationDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {

    return await this.avaliationService.createAvaliation(createAvaliationDto, tokenPayload);

  }

  @ApiParam({name: 'id', description: DOC_GET_HISTORY_AVALIATION_BY_USER_DESCRIPTION})
  @ApiBearerAuth(DOC_BEARER_AUTH)
  @ApiOperation({summary: DOC_GET_HISTORY_AVALIATION_BY_USER_SUMMARY})
  @Get('history-by-user/:id')
  async findAll(@Param('id', ParseIntPipe) id: number, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {

    return await this.avaliationService.findAvaliationHistoryByUser(id, tokenPayload);
    
  }

  @ApiParam({name: 'id', description: DOC_GET_AVALIATION_BY_ID_DESCRIPTION})
  @ApiBearerAuth(DOC_BEARER_AUTH)
  @ApiOperation({summary: DOC_GET_AVALIATION_BY_ID_SUMMARY})
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {

    return await this.avaliationService.findOneAvaliationById(id, tokenPayload);

  }

}
