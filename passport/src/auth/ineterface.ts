import { User } from 'src/users/user.entity';

export interface JwtPayload {
  userId: User['id'];
  username: User['name'];
}
