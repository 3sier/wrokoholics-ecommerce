import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/Users.service';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    let user = await this.userService.findOne({ username, password });

    if (user && user.password === password) {
      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, userId: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
