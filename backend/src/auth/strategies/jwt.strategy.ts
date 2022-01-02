import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "../utils/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: "email",
      passwordField: "password",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secretOrKey,
      ignoreExpiration: false,
    });
  }

  async validate(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return payload;
  }
}
