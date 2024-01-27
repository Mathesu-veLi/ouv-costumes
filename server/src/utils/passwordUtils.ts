import { hashSync, compare } from 'bcryptjs';

export function generatePasswordHash(password: string): string {
  return hashSync(password, 12);
}

export function passwordIsValid(
  password: string,
  password_hash: string,
): boolean {
  return compare(password, password_hash);
}
