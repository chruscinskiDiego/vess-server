import { Injectable } from '@nestjs/common';
import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { UpdateAvaliationDto } from './dto/update-avaliation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Avaliation } from './entities/avaliation.entity';
import { Repository } from 'typeorm';
import { sampleLayerDto } from 'src/sample_layers/dto/create-sample_layer.dto';
import { SampleAvaliationService } from 'src/sample_avaliation/sample_avaliation.service';
import { sampleAvaliationDto } from 'src/sample_avaliation/dto/create-sample_avaliation.dto';

@Injectable()
export class AvaliationService {

  constructor(
    @InjectRepository(Avaliation)
    private readonly avaliationRepository: Repository<Avaliation>,

    private readonly sampleAvaliationService: SampleAvaliationService,

  ) { }

  async createAvaliation(createAvaliationDto: CreateAvaliationDto) {

    const avaliation = {
      description: createAvaliationDto.description,
      management_decision: createAvaliationDto.management_decision,
      summary: createAvaliationDto.summary,
      infos: createAvaliationDto.infos,
      fk_user_id: createAvaliationDto.fk_user_id,
      created_at: new Date().toISOString(),
    };


    try {


      const createdAvaliation = await this.avaliationRepository.create(avaliation);

      const savedAvaliation = await this.avaliationRepository.save(createdAvaliation);

      const avaliationId = savedAvaliation.id_avaliation;

      const sample_avaliation: any = createAvaliationDto.sample_avaliation.map((sample) => {
        return {
          name: sample.name,
          num_layers: sample.num_layers,
          file_link: sample.file_link,
          score: sample.score,
          fk_id_avaliation: avaliationId,
          sample_layers: sample.sample_layers.map((layer: sampleLayerDto) => {
            return {
              length: layer.length,
              note: layer.note,
            };
          }),
          sample_location: {
            latitude: sample.sample_location.latitude,
            longitude: sample.sample_location.longitude,
          }
        }
      }
      );

      const sampleAvaliationCreated = await this.sampleAvaliationService.createSampleAvaliations(sample_avaliation);

      return {
        message: 'Avaliação criada com sucesso!',
        avaliation: savedAvaliation,
        sampleAvaliation: sampleAvaliationCreated,
      }

    }
    catch (error) {
      console.error('Error creating avaliation:', error);
      throw error;
    }

  }

  findAll() {
    return `This action returns all avaliation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} avaliation`;
  }

  update(id: number, updateAvaliationDto: UpdateAvaliationDto) {
    return `This action updates a #${id} avaliation`;
  }

  remove(id: number) {
    return `This action removes a #${id} avaliation`;
  }
}
