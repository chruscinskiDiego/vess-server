import { PartialType } from '@nestjs/mapped-types';
import { sampleLocationDto } from './create-sample_location.dto';

export class UpdateSampleLocationDto extends PartialType(sampleLocationDto) {}
