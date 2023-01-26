import { Role } from 'src/user/user';

export default interface IUserContext {
  userId: number;
  email: string;
  roles: string[];
}
