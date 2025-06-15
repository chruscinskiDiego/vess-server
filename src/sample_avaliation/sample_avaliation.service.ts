import { BadRequestException, Injectable } from '@nestjs/common';
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

        if ((sample.sample_layers.length > 5)) {
          throw new BadRequestException('Cada amostra pode possuir no máximo 5 camadas!');
        }

        if ((sample.sample_layers.length <= 0)) {
          throw new BadRequestException('Cada amostra pode possuir no mínimo 1 camada!');
        }

        for (const layer of sample.sample_layers) {

          await this.sampleLayerService.createSampleLayer(layer, sampleId);

        }

        await this.sampleLocationService.createSampleLocation(sample.sample_location, sampleId);

      }
    } catch (error) {

      throw error;

    }
  }

  async findAllSampleLayersByAvaliationId(avaliationId: number) {
  try {
    const samples = await this.sampleAvaliationRepository.find({
      where: { fk_id_avaliation: avaliationId as any },
    });

    const samplesWithLayers = await Promise.all(
      samples.map(async sample => {
        const layers = await this.sampleLayerService.findAllSampleLayersBySampleId(sample.id_sample);
        const location = await this.sampleLocationService.findSampleLocationBySampleId(sample.id_sample);

        return {
          ...sample,
          layers,
          location,
        };
      }),
    );

    return samplesWithLayers;
  } catch (error) {
    throw new Error(error);
  }
}

  findOne(id: number) {
    return `This action returns a #${id} sampleAvaliation`;
  }


  remove(id: number) {
    return `This action removes a #${id} sampleAvaliation`;
  }
}
