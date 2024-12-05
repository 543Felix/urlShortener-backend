import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dtos/createUser.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async registerUser(@Body() data: createUserDto, @Res() res: Response) {
    const { accessToken, user } = await this.userService.registerUser(data);
    res.cookie('jwt', accessToken, { httpOnly: true });
    return res.send({ message: 'Registration successful', user });
  }

  @Post('login')
  async login(
    @Body() data: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { token, user, message } = await this.userService.login(data);
    if (message) {
      return res.status(401).json(message);
    } else {
      res.cookie('jwt', token);
      return res.status(200).json(user);
    }
  }

  @Post('logout')
  logOut(@Res() res: Response) {
    res.clearCookie('jwt');
    res.status(200).json({ messge: 'LogOut sucessfully' });
  }
}
