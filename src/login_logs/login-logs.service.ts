import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginLogs } from './schemas/login-log.schema';
import { Model } from 'mongoose';
import { LoginLogDto } from './dto/login-log.dto';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class LogsService {

    constructor(
        @InjectModel(LoginLogs.name) private readonly loginLogsModel: Model<LoginLogs>
    ){}

    async createLoginLog(loginLog: LoginLogDto) {

        try{

        const createdLog = new this.loginLogsModel(loginLog);

        return createdLog.save();

        } catch (error) {

            throw new Error('Failed to create login log');

        }

    }

    async findAllLoginLogs(tokenPayload: TokenPayloadDto){

        if(tokenPayload.role !== 'admin'){
            throw new ForbiddenException('Seu usuário não possui acesso à este recurso!');
        }

        return this.loginLogsModel.find().sort({loginDate: -1}).exec();

    }
}
