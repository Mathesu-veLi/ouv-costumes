import { hashSync, compareSync } from 'bcrypt';

export function generatePasswordHash(password: string): string {
  return hashSync(password, 12);
}

export function passwordIsValid(
  password: string,
  password_hash: string,
): boolean {
  return compareSync(password, password_hash);
}
