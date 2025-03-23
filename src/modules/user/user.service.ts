import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./create-user.dto";// 导入 DTO, 用于验证数据, 防止恶意请求
import * as md5 from 'md5';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
}