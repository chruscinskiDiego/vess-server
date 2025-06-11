import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5mb de limite
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new BadRequestException('Somente imagens são permitidas'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) id: number) {
    
    if (!file) {
      throw new BadRequestException('Arquivo não enviado');
    }

    if(!id){
      throw new BadRequestException('ID da avaliação não enviado');
    }

    const url = await this.s3Service.uploadFile(file, 'users/', id);

    return { url };
  }
}
