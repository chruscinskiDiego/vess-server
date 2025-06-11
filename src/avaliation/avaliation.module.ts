import { Module } from '@nestjs/common';
import { AvaliationService } from './avaliation.service';
import { AvaliationController } from './avaliation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliation } from './entities/avaliation.entity';
import { UserConfigModule } from 'src/user_config/user_config.module';
import { SampleAvaliationModule } from 'src/sample_avaliation/sample_avaliation.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avaliation]),
    UserConfigModule,
    SampleAvaliationModule,
    AuthModule,
  ],
  controllers: [AvaliationController],
  providers: [AvaliationService],
  exports: [AvaliationService]
})
export class AvaliationModule {}
