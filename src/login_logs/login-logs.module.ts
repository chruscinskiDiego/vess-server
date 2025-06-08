import { Module } from '@nestjs/common';
import { LogsService } from './login-logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginLogs, LoginSchema } from './schemas/login-log.schema';
import { LoginLogsController } from './login-logs.controller';


@Module({
  imports: [
   MongooseModule.forFeature([{
    name: LoginLogs.name,
    schema: LoginSchema,
   }])
  ],
  controllers: [LoginLogsController],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
