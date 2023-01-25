import { Role } from 'src/user/user';

export interface IJwtPayload {
  email: string;
  sub: number;
  roles: Role[];
}
