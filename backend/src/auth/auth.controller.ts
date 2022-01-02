import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SigninUserDto } from "src/users/dto/signin-user.dto";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@ApiTags("Auth")
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  @ApiBody({ type: SigninUserDto })
  @ApiOperation({
    summary: "로그인 API",
    description: "로그인 API 입니다.",
  })
  async signin(
    @Body() signinUserDto: SigninUserDto
  ): Promise<{ access_token: string }> {
    return this.authService.signin(signinUserDto);
  }
}
