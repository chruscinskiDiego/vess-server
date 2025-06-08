import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserConfigModule } from './user_config/user_config.module';
import { AvaliationModule } from './avaliation/avaliation.module';
import { SampleAvaliationModule } from './sample_avaliation/sample_avaliation.module';
import { SampleLayersModule } from './sample_layers/sample_layers.module';
import { SampleLocationModule } from './sample_location/sample_location.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env',
      },
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,  // apenas em dev
    }),
    UserConfigModule,
    AvaliationModule,
    SampleAvaliationModule,
    SampleLayersModule,
    SampleLocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
