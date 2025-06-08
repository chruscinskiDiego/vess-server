import { Module } from '@nestjs/common';
import { SampleAvaliationService } from './sample_avaliation.service';
import { SampleAvaliationController } from './sample_avaliation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleAvaliation } from './entities/sample_avaliation.entity';
import { SampleLayersModule } from 'src/sample_layers/sample_layers.module';
import { SampleLocationModule } from 'src/sample_location/sample_location.module';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([SampleAvaliation]),
    SampleLayersModule,
    SampleLocationModule,
  ],
  controllers: [SampleAvaliationController],
  providers: [SampleAvaliationService],
  exports: [SampleAvaliationService]
})
export class SampleAvaliationModule {}
