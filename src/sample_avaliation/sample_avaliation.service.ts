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

  /*async createSampleAvaliations( sampleAvaliationDto: sampleAvaliationDto[]) {


    try {

      sampleAvaliationDto.forEach(async (sample:any) => {

        const createdSample = this.sampleAvaliationRepository.create(sample);

        const savedSample: any = await this.sampleAvaliationRepository.save(createdSample);

        const sampleId = savedSample.id_sample;

        sample.sample_layers.forEach(async (layer: any) => {

          const sampleLayerCreated = await this.sampleLayerService.createSampleLayer(layer, sampleId);


        });

        sample.sample_location.forEach(async (location: any) => {

          const sampleLocationCreated = await this.sampleLocationService.createSampleLocation(location, sampleId);

        });

      })

    } catch (error) {

      console.error('Error creating sample avaliation:', error);
      throw new Error('Failed to create sample avaliation');

    }

  }*/

  async createSampleAvaliations(sampleAvaliationDto: any[]) {

    const resultArray: any[] = [
      {
        samples: [],
        layers: [],
      }
    ];

    try {
      // Percorre cada avaliação de forma sequencial
      for (const sample of sampleAvaliationDto) {

        const createdSample = this.sampleAvaliationRepository.create(sample);
        const savedSample: any = await this.sampleAvaliationRepository.save(createdSample);
        const sampleId = savedSample.id_sample;

        console.log('SAMPLE ID: ', sampleId);

        // Processa todos os layers dessa avaliação, um a um
        for (const layer of sample.sample_layers) {

          const createdLayer = await this.sampleLayerService.createSampleLayer(layer, sampleId);

          console.log('Layer created:', createdLayer);

        }

        const createdLocation = await this.sampleLocationService.createSampleLocation(sample.sample_location, sampleId);

        console.log('Location created:', createdLocation);

      }
    } catch (error) {
      console.error('Error creating sample avaliation:', error);
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
