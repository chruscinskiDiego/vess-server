import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Avaliation } from './entities/avaliation.entity';
import { Repository } from 'typeorm';
import { SampleAvaliationService } from 'src/sample_avaliation/sample_avaliation.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';


@Injectable()
export class AvaliationService {

  constructor(
    @InjectRepository(Avaliation)
    private readonly avaliationRepository: Repository<Avaliation>,

    private readonly sampleAvaliationService: SampleAvaliationService,

  ) { }

  async createAvaliation(createAvaliationDto: CreateAvaliationDto, tokenPayload: TokenPayloadDto) {

    if (tokenPayload.sub !== createAvaliationDto.user_id) {
      throw new ForbiddenException('Você não pode criar avaliações para este usuário!');
    }

    const avaliationDto: any = {
      description: createAvaliationDto.description,
      management_decision: createAvaliationDto.management_decision,
      summary: createAvaliationDto.summary,
      infos: createAvaliationDto.infos,
      fk_user_id: createAvaliationDto.user_id,
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
          num_layers: sample.sample_layers.length,
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

      if (error.code === '23503') {
        throw new BadRequestException('Usuário não encontrado');
      }

      throw error;
    }

  }

  async insertFileLinkInAvaliation(avaliationId: number, fileLink: string) {

    try {

      await this.avaliationRepository
        .createQueryBuilder()
        .update(Avaliation)
        .set({ file_link: fileLink })
        .where('id_avaliation = :id', { id: avaliationId })
        .execute()

    } catch (error) {

      throw error;

    }
  }

  async findAvaliationHistoryByUser(userId: number, tokenPayload: TokenPayloadDto) {

    if (tokenPayload.sub !== userId) {
      throw new ForbiddenException('Você não tem permissão para ver as avaliações do usuário!');
    }

    const avaliationHistory = await this.avaliationRepository
      .createQueryBuilder()
      .select([
        'id_avaliation',
        'description',
        'infos',
        'file_link',
        'created_at'
      ])
      .where('fk_user_id = :id', { id: userId })
      .orderBy('id_avaliation', 'DESC')
      .getRawMany();

    return {
      history: avaliationHistory
    }
  }

  async findOneAvaliationById(avaliationId: number, tokenPayload: TokenPayloadDto) {

    const avaliation = await this.avaliationRepository.findOne({
      where: { id_avaliation: avaliationId },
      select: {
        id_avaliation: true,
        description: true,
        management_decision: true,
        summary: true,
        infos: true,
        file_link: true,
        created_at: true,
        fk_user_id: true,
      }
    });

    if (!avaliation) {
      throw new BadRequestException('Avaliação não encontrada!');
    }

    if (tokenPayload.sub !== (avaliation.fk_user_id as unknown as number)) {
      throw new ForbiddenException('Você não tem permissão para ver a avaliação do usuário!');
    }

    const sampleAvaliations = await this.sampleAvaliationService.findAllSampleLayersByAvaliationId(avaliationId);

    return {
      ...avaliation,
      sampleAvaliations
    }

  }

}
