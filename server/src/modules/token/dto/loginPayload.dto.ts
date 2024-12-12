import { Role } from '@prisma/client';

export class LoginPayload {
  email: string;
  password: string;
  role: Role;
}
