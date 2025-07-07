import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback, StrategyOptions } from "passport-google-oauth20";
import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import jwtConfig from "./config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    @Inject(jwtConfig.KEY) private jwtCfg: ConfigType<typeof jwtConfig>,
    private authService: AuthService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: false,
      scope: ["email", "profile"],
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) {
    const { id, emails, displayName } = profile;
    const email = emails[0].value;

    const jwtPayload = await this.authService.validateGoogleLogin({
      id,
      email,
      displayName,
    });

    done(null, jwtPayload);
  }
}
