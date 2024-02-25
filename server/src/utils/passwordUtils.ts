import { hashSync, compare } from 'bcryptjs';

export function generatePasswordHash(password: string): string {
  return hashSync(password, 12);
}

export async function passwordIsValid(
  password: string,
  password_hash: string,
): Promise<boolean> {
  return await compare(password, password_hash);
}
