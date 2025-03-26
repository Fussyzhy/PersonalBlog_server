import { Body, Controller, Get, Post, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { success, error } from "src/untils";
import { Public } from "./public.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body) {
    const { username, password } = body;
    return this.authService.login({username, password})
    .then(res => {
      return success (res, '登录成功')
    })
    .catch(err => {
      return error (err)
    })
  }

  @Get('getInfo/:token')
  getInfo(@Param('token') token: string) {
    return this.authService.getUserByToken(token)
  }

}