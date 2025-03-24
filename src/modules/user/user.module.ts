import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),// 注册实体
  ],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService],
})

export class UserModule {}