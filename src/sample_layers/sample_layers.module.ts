import { Module } from '@nestjs/common';
import { SampleLayersService } from './sample_layers.service';
import { SampleLayersController } from './sample_layers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleLayer } from './entities/sample_layer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SampleLayer])],
  controllers: [SampleLayersController],
  providers: [SampleLayersService],
  exports: [SampleLayersService]
})
export class SampleLayersModule {}
