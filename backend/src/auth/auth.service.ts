import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SigninUserDto } from "src/users/dto/signin-user.dto";
import { UsersService } from "src/users/users.service";
import { compare } from "bcrypt";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<User> | null {
    const user = await this.usersService.findOneByEmail(email);
    const isMatched = await compare(password, user.password);
    if (!user || (user && !isMatched)) {
      return null;
    }
    return user;
  }

  async signIn(user: SigninUserDto) {
    const payload = { email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
