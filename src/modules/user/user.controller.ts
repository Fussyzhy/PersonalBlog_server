import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../auth/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('getUser/:id')
  getUser(@Param('id',ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post('addUser')
  addUser(@Body() body) {
    return this.userService.createUser(body);
  }

  @Get('getUser')
  getAllUser() {
    return this.userService.findAll(); 
  }

  @Delete('deleteUser/:id')
  deleteUser(@Param('id',ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Post('getEmail')
  @Public()
  getEmail(@Body() body) {
    return this.userService.sendVerificationCode(body.email);
  }

  @Post('register')
  @Public()
  register(@Body() body) {
    return this.userService.register(body);
  }
}