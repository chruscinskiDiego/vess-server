import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDTO } from "./dto/login.dto";
import { Repository } from "typeorm";

import { InjectRepository } from "@nestjs/typeorm";
import { HashingServiceProtocol } from "./hashing/hashing.service";
import jwtConfig from "./config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserConfig } from "src/user_config/entities/user_config.entity";
import { LogsService } from "src/login_logs/login-logs.service";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserConfig)
        private readonly usersRepository: Repository<UserConfig>,
        private readonly hashingService: HashingServiceProtocol,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService,
        private readonly loginLogsService: LogsService
    ) { }

    async login(loginDTO: LoginDTO) {

        let passwordIsValid = false;

        const user = await this.usersRepository.findOneBy({
            email: loginDTO.email
        });

        if (user) {
            passwordIsValid = await this.hashingService.compare(
                loginDTO.password,
                user.password
            );

            passwordIsValid = true;
        };

        if (!user || !passwordIsValid) {
            throw new UnauthorizedException('Email ou senha inválidos!');
        }

        const accessToken = await this.jwtService.signAsync(
            {
                sub: user.id_user,
                email: user.email,
                role: user.role,
            },
            {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                expiresIn: this.jwtConfiguration.expiresIn,
            }
        );

        const registeredLoginLog = await this.loginLogsService.createLoginLog({
            userId: user.id_user,
            userEmail: user.email,
            userName: user.name,
            loginDate: new Date().toISOString()
        });

        
        return {
            accessToken,
        }
    }
}