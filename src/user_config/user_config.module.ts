import { Module } from '@nestjs/common';
import { UserConfigService } from './user_config.service';
import { UserConfigController } from './user_config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConfig } from './entities/user_config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserConfig])],
  controllers: [UserConfigController],
  providers: [UserConfigService],
  exports: [UserConfigService]
})
export class UserConfigModule {}
