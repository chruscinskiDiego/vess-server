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
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './login_logs/login-logs.module';

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
    MongooseModule.forRoot(
      // string de conexão ao Mongo rodando no Docker
      `mongodb://${process.env.MONGO_COMPOSE_USERNAME}` +
      `:${process.env.MONGO_COMPOSE_PASSWORD}` +
      `@localhost:${process.env.MONGO_COMPOSE_PORTS!.split(':')[0]}` +
      `/${process.env.MONGO_COMPOSE_DATABASE}` +
      `?authSource=admin`
    ),
    UserConfigModule,
    AvaliationModule,
    SampleAvaliationModule,
    SampleLayersModule,
    SampleLocationModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
