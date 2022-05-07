// import bcrypt = require('bcrypt');
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './ineterface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(
    username: User['name'],
    password: User['password'],
  ): Promise<User | undefined> {
    const user = await this.usersService.findOne(username);

    // if (user && bcrypt.compareSync(password, user.password)) {
    if (user && password === user.password) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    // jwtにつけるPayload情報
    const payload: JwtPayload = { userId: user.id, username: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
