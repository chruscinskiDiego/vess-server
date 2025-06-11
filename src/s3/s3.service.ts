import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { AvaliationService } from 'src/avaliation/avaliation.service';
//import 'dotenv/config';     // <— garante o carregamento do .env

@Injectable()
export class S3Service {

    constructor(
        private readonly avaliationService: AvaliationService
    ){}

    private readonly s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });

    async uploadFile(file: Express.Multer.File, keyPrefix = '', avaliationId: number) {

        //TODO validar se o user do jwt corresponde com o usuario no banco
        
        const bucket = process.env.S3_BUCKET_NAME!;
        const key = `${keyPrefix}${Date.now()}-${file.originalname}`;

        await this.s3.send(new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        }));

        const imageLink = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

        await this.avaliationService.insertFileLinkInAvaliation(avaliationId, imageLink);

        return {
            uploadStatus: 'success',
            link: `${imageLink}`
        }

    }
}
