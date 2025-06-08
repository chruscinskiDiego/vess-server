import { PartialType } from '@nestjs/mapped-types';
import { sampleLayerDto } from './create-sample_layer.dto';

export class UpdateSampleLayerDto extends PartialType(sampleLayerDto) {}
