import { BadRequestException, Injectable } from '@nestjs/common';
import { sampleLocationDto } from './dto/create-sample_location.dto';
import { UpdateSampleLocationDto } from './dto/update-sample_location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleLocation } from './entities/sample_location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SampleLocationService {

  constructor(
    @InjectRepository(SampleLocation)
    private readonly sampleLocationRepository: Repository<SampleLocation>,
  ) { }

  async createSampleLocation(createSampleLocationDto: sampleLocationDto, sampleAvaliationId: any) {

    const sampleLocationDto: any = {
      latitude: createSampleLocationDto.latitude,
      longitude: createSampleLocationDto.longitude,
      fk_id_sample: sampleAvaliationId,
    };

    const existingLocation = await this.sampleLocationRepository
      .createQueryBuilder('loc')
      .where('loc.fk_id_sample = :sid', { sid: sampleAvaliationId })
      .getOne();


    if (existingLocation) {
      throw new BadRequestException('Sample location already exists for this sample avaliation');
    }

    const createdSampleLocation = await this.sampleLocationRepository.create(sampleLocationDto);

    const savedSampleLocation = await this.sampleLocationRepository.save(createdSampleLocation);

    return savedSampleLocation;

  }

  findAll() {
    return `This action returns all sampleLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sampleLocation`;
  }

  update(id: number, updateSampleLocationDto: UpdateSampleLocationDto) {
    return `This action updates a #${id} sampleLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} sampleLocation`;
  }
}
