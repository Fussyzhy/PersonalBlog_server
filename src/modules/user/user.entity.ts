import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity( 'user' )// 表名
export class User {
  @PrimaryGeneratedColumn()// 自增字段
  id: number;

  @Column()// 普通字段
  @Unique( ['username'] )// 唯一约束
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role: number;

  @Column()
  nickname: string;
}