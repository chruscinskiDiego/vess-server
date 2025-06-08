import { Module, UseGuards } from '@nestjs/common';
import { SampleLayersService } from './sample_layers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleLayer } from './entities/sample_layer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SampleLayer])],
  providers: [SampleLayersService],
  exports: [SampleLayersService]
})
export class SampleLayersModule {}
