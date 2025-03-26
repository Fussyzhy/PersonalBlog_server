import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(1);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: 生成一个 JWT，并在这里返回
    // 而不是返回一个用户对象
    return result;
  }

  async login ({ username, password }) {
    const user = await this.userService.findByUsername(username);
    const hashedPassword = md5( password );
    const payload = {
      uuserid: user?.id, 
      username: user?.username,
      nickname: user?.nickname,
    }
    if ( user && user.password === hashedPassword ) {
      
      return {
        token: await this.jwtService.signAsync( payload )
      }

    } else {
      throw new UnauthorizedException();
    }
  }

  // 添加解析token的方法
  async verifyToken(token: string) {
    try {
      // 验证并解码token
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('无效的token');
    }
  }

  // 添加获取用户信息的方法
  async getUserByToken(token: string) {
    // 解析token获取用户信息
    const payload = await this.verifyToken(token);
    // 根据用户ID查询完整的用户信息
    const user = await this.userService.findOne(payload.uuserid);
    
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    
    // 移除敏感信息
    const { password, ...result } = user;
    return {
      code: 200,
      data: result,
      msg: '获取成功'
    };
  }



}
