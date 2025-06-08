import { Controller, Get, UseGuards } from "@nestjs/common";
import { LogsService } from "./login-logs.service";
import { TokenPayloadParam } from "src/auth/params/token-payload.params";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { AuthTokenGuard } from "src/auth/guards/auth-token.guard";

@UseGuards(AuthTokenGuard)
@Controller('login-logs')
export class LoginLogsController {

    constructor(private readonly loginLogsService: LogsService) {}

    @Get()
    async findAllLoginLogs(@TokenPayloadParam() tokenPayload: TokenPayloadDto){

        return await this.loginLogsService.findAllLoginLogs(tokenPayload);

    }
}