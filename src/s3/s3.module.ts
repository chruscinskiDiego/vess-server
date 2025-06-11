import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { S3Service } from './s3.service';
import { ImagesController } from './s3.controller';
import { AvaliationModule } from 'src/avaliation/avaliation.module';

const s3Client = new S3Client({}); // pega creds e region do env

@Module({
  providers: [
    { provide: S3Client, useValue: s3Client },
    S3Service,
  ],
  controllers: [ImagesController],
  imports: [AvaliationModule],
  exports: [S3Service],
})
export class S3Module {}
