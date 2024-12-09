import { Role } from '@/modules/users/enum/user-type.enum';

export class LoginPayload {
  email: string;
  password: string;
  role: Role;
}
