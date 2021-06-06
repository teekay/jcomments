
import { Injectable } from '@nestjs/common';
import { AccountService } from '../accounts/account.service';

@Injectable()
export class AuthService {
  constructor(private usersService: AccountService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.login(username, pass);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
