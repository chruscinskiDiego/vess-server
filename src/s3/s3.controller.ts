import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DOC_IMAGE_TAG } from 'src/doc/swagger-consts';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';


@ApiTags(DOC_IMAGE_TAG)
@UseGuards(AuthTokenGuard)
@Controller('images')
export class ImagesController {
  constructor(private readonly s3Service: S3Service) {}

  @ApiOperation({ summary: 'Faz upload de uma imagem' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { 
          type: 'string', 
          format: 'binary',
          description: 'Escolha um arquivo de imagem para upload',
        },
      },
      required: ['file'],
    },
  })
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
  @Post('upload/:id')
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
