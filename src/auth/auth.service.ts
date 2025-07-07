import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDTO } from "./dto/login.dto";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from "@nestjs/typeorm";
import { HashingServiceProtocol } from "./hashing/hashing.service";
import jwtConfig from "./config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserConfig } from "src/user_config/entities/user_config.entity";
import { LogsService } from "src/login_logs/login-logs.service";
import { OAuth2Client } from "google-auth-library";

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

        await this.loginLogsService.createLoginLog({
            userId: user.id_user,
            userEmail: user.email,
            userName: user.name,
            loginDate: new Date().toISOString()
        });

        //TODO OLHAR MELHOR ESSA PARTE DO CÓDIGO

        return {
            accessToken,
            userId: user.id_user,
        }
    }

    async validateGoogleLogin(profile: { id: string; email: string; displayName: string }) {

        let user = await this.usersRepository.findOneBy({ email: profile.email });

        if (!user) {

            const base = `${Date.now()}-${Math.random()}`;
            const saltRounds = 10;
            const hash = await bcrypt.hash(base, saltRounds);

            const userDTO = {
                name: profile.displayName,
                email: profile.email,
                password: hash,
                country: 'Brasil',
                address: 'Brasil',
                language: 'Brasil',
                role: 'default'
            };

            user = this.usersRepository.create(userDTO);

            await this.usersRepository.save(user);
        }

        const token = await this.jwtService.signAsync(
            {
                sub: user.id_user,
                email: user.email,
                role: user.role
            },
            {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                expiresIn: this.jwtConfiguration.expiresIn,
            }
        );
        return { accessToken: token, userId: user.id_user };
    }

    async loginWithGoogle(idToken: string) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let payload;

        try {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            payload = ticket.getPayload();
        } catch (error) {
            throw new UnauthorizedException('ID Token inválido');
        }

        if (!payload?.email || !payload.name) {
            throw new UnauthorizedException('Dados insuficientes do Google');
        }

        return this.validateGoogleLogin({
            id: payload.sub,
            email: payload.email,
            displayName: payload.name,
        });
    }
}