import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      username: 'johndoe',
      password: 'password1',
    },
    {
      id: 2,
      username: 'jane',
      password: 'password2',
    },
  ];

  findOne(username: string): any {
    return this.users.find((user) => user.username === username);
  }
}
