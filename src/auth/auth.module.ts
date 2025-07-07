import { Global, Module } from "@nestjs/common";
import { HashingServiceProtocol } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { UserConfig } from "src/user_config/entities/user_config.entity";
import { LogsModule } from "src/login_logs/login-logs.module";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./google.strategy";

@Global()
@Module({
    providers: [
        {
            provide: HashingServiceProtocol,
            useClass: BcryptService,
        },
        AuthService,
        GoogleStrategy
    ],
    controllers: [
        AuthController
    ],
    exports: [
        HashingServiceProtocol,
        JwtModule,
        ConfigModule,
    ],
    imports: [
        TypeOrmModule.forFeature([UserConfig]),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        PassportModule.register({ defaultStrategy: "jwt" }),
        AuthModule,
        LogsModule,
    ]
})
export class AuthModule {}