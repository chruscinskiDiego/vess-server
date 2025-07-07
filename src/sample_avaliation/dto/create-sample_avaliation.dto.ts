import {
  ApiProperty,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { sampleLayerDto } from 'src/sample_layers/dto/create-sample_layer.dto';
import { sampleLocationDto } from 'src/sample_location/dto/create-sample_location.dto';

@ApiExtraModels(sampleLayerDto, sampleLocationDto)
export class sampleAvaliationDto {

  @ApiProperty({ example: 'nome...' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 8 })
  @IsNotEmpty()
  @IsNumber()
  score: number;
  
  @IsNotEmpty()
  @IsNumber()
  fk_id_avaliation: number;

  @ApiProperty({
    type: sampleLayerDto,
    isArray: true,
  })
  @Type(() => sampleLayerDto)
  @IsNotEmpty()
  @IsArray()
  sample_layers: sampleLayerDto[];

  @ApiProperty({
    type: sampleLocationDto,
  })
  @Type(() => sampleLocationDto)
  @IsNotEmpty()
  @IsObject()
  sample_location: sampleLocationDto;

  fk_id_sample?: number;
}
