import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { UpdateAvaliationDto } from './dto/update-avaliation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Avaliation } from './entities/avaliation.entity';
import { Repository } from 'typeorm';
import { SampleAvaliationService } from 'src/sample_avaliation/sample_avaliation.service';


@Injectable()
export class AvaliationService {

  constructor(
    @InjectRepository(Avaliation)
    private readonly avaliationRepository: Repository<Avaliation>,

    private readonly sampleAvaliationService: SampleAvaliationService,

  ) { }

  async createAvaliation(createAvaliationDto: CreateAvaliationDto) {

    const avaliationDto: any= {
      description: createAvaliationDto.description,
      management_decision: createAvaliationDto.management_decision,
      summary: createAvaliationDto.summary,
      infos: createAvaliationDto.infos,
      fk_id_user: createAvaliationDto.user_id,
      file_link: '',
      created_at: new Date().toISOString(),
    };

    try {

      const createdAvaliation: any = await this.avaliationRepository.create(avaliationDto);

      const savedAvaliation = await this.avaliationRepository.save(createdAvaliation);

      const avaliationId = savedAvaliation.id_avaliation;

      const sampleAvaliationsDto = createAvaliationDto.sample_avaliation.map((sample) => {
        return {
          name: sample.name,
          num_layers: sample.num_layers,
          score: sample.score,
          sample_layers: sample.sample_layers,
          sample_location: sample.sample_location,
          fk_id_avaliation: avaliationId,
        }
      });

      await this.sampleAvaliationService.createSampleAvaliations(sampleAvaliationsDto);

      return {
        message: 'Avaliação criada com sucesso!',
        avaliation: savedAvaliation.id_avaliation,
      }

    }
    catch (error) {

      if(error.code === '23503'){
        throw new BadRequestException('Usuário não encontrado');
      }

      throw error;
    }

  }

  async insertFileLinkInAvaliation (avaliationId:number, fileLink: string){

    try{

      await this.avaliationRepository
      .createQueryBuilder()
      .update(Avaliation)
      .set({file_link: fileLink})
      .where('id_avaliation = :id', {id: avaliationId})
      .execute()
      
    }catch(error){

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
