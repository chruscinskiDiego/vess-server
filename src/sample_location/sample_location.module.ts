import { Module } from '@nestjs/common';
import { SampleLocationService } from './sample_location.service';
import { SampleLocationController } from './sample_location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleLocation } from './entities/sample_location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SampleLocation])],
  controllers: [SampleLocationController],
  providers: [SampleLocationService],
  exports: [SampleLocationService]
})
export class SampleLocationModule {}
