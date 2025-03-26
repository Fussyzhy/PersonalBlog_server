import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./create-user.dto";// 导入 DTO, 用于验证数据, 防止恶意请求
import * as md5 from 'md5';
import { EmailService } from "../email/email.service";
import { RedisService } from "../redis/redis.service";// 导入 RedisService

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService, // 注入 EmailService
    private readonly redisService: RedisService, // 注入 RedisService
  ) {}

  // 查询用户
  findOne(id: number) {
    return this.userRepository.findOneBy({ id }); 
  }

  // 查询所有用户
  findAll() {
    return this.userRepository.find(); 
  }

  // 新增用户
  createUser(CreateUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.username = CreateUserDto.username;
    newUser.password = md5(CreateUserDto.password);
    newUser.avatar = CreateUserDto.avatar;
    newUser.role = CreateUserDto.role;
    newUser.nickname = CreateUserDto.nickname;
    return this.userRepository.save(newUser);
  }

  // 删除用户
  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  // 根据用户名查找用户
  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  // 发送注册验证码
  async sendVerificationCode(email: string) {
    const code = Math.random().toString().slice(2, 6); // 生成 4 位随机验证码
    await this.emailService.sendVerificationEmail(email, code); // 发送验证码邮件
    // 存储数据到Redis
    await this.redisService.set(email, code, 300); // 300秒过期
    return {
      code: 200,
      msg: '验证码发送成功',
      pass: code,
    };
  }

  // 注册
  async register(body) {
    const storedCode = await this.redisService.get(body.username);
    // 验证验证码
    if (body.code != storedCode ) {
      return {
        code: 400,
        msg: '验证码错误',
      };
    } else {
      // 删除验证码
      await this.redisService.del(body.username);
      // 注册
      const newUser = new User();
      newUser.username = body.username;
      newUser.password = md5(body.password);
      newUser.avatar = '1';
      newUser.role = 1;
      newUser.nickname = body.username;
      this.userRepository.save(newUser);
      return {
        code: 200,
        msg: '注册成功',
      };
    }
    
  }

}