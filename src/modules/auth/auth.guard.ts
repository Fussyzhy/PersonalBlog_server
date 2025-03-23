import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './public.decorator';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from './auth.jwt.secret';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //获取是否是公开的
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const requset = context.switchToHttp().getRequest();
    if (!requset.headers?.authorization) {
      throw new UnauthorizedException();
    }
    const token = getToken(requset);
    //验证token
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
     const payload = await this.jwtService.verifyAsync(token , {
      secret: JWT_SECRET_KEY
     }); 
     requset.user = payload;
    } catch (error) {
      throw new UnauthorizedException(); 
    }

    return true;
  }
}

const getToken = (requst) => {
  const [ type, token ] = requst.headers.authorization.split(' '); 
  return type === 'XIAONAO' ? token : undefined;
}
