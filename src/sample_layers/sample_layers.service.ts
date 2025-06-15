import { Injectable } from '@nestjs/common';
import { sampleLayerDto } from './dto/create-sample_layer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleLayer } from './entities/sample_layer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SampleLayersService {

  constructor(
    @InjectRepository(SampleLayer)
    private readonly sampleLayerRepository: Repository<SampleLayer>,
  ) { }

  async createSampleLayer(createSampleLayerDto: sampleLayerDto, sampleAvaliationId: any) {

    const sampleLayerDto: any = {
      length: createSampleLayerDto.length,
      note: createSampleLayerDto.note,
      fk_id_sample: sampleAvaliationId,
    };

    const createdSampleLayer = this.sampleLayerRepository.create(sampleLayerDto);

    const savedSampleLayer = await this.sampleLayerRepository.save(createdSampleLayer);

    return savedSampleLayer;

  }

  async findAllSampleLayersBySampleId(sampleId: number) {
    
    
    const sampleLayers = await this.sampleLayerRepository.find({
      where: {fk_id_sample: sampleId as any},
    });

    return sampleLayers;
  }

}
