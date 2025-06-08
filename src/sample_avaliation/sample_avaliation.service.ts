import { Injectable } from '@nestjs/common';
import { sampleAvaliationDto } from './dto/create-sample_avaliation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleAvaliation } from './entities/sample_avaliation.entity';
import { Repository } from 'typeorm';
import { SampleLayersService } from 'src/sample_layers/sample_layers.service';
import { SampleLocationService } from 'src/sample_location/sample_location.service';
import { sampleLayerDto } from 'src/sample_layers/dto/create-sample_layer.dto';

@Injectable()
export class SampleAvaliationService {

  constructor(
    @InjectRepository(SampleAvaliation)
    private readonly sampleAvaliationRepository: Repository<SampleAvaliation>,
    private readonly sampleLayerService: SampleLayersService,
    private readonly sampleLocationService: SampleLocationService,
  ) { }

  async createSampleAvaliations(sampleAvaliationDto) {

    try {

      for (const sample of sampleAvaliationDto) {

        const createdSample = this.sampleAvaliationRepository.create(sample);

        const savedSample: any = await this.sampleAvaliationRepository.save(createdSample);

        const sampleId = savedSample.id_sample;

        for (const layer of sample.sample_layers) {

          await this.sampleLayerService.createSampleLayer(layer, sampleId);

        }

        await this.sampleLocationService.createSampleLocation(sample.sample_location, sampleId);
        
      }
    } catch (error) {

      throw new Error('Failed to create sample avaliation');

    }
  }

  findAll() {
    return `This action returns all sampleAvaliation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sampleAvaliation`;
  }


  remove(id: number) {
    return `This action removes a #${id} sampleAvaliation`;
  }
}
