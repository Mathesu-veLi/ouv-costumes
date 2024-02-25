import { HttpException, HttpStatus } from '@nestjs/common';

export function userNotExist() {
  return new HttpException('User not found', HttpStatus.NOT_FOUND);
}

export function passwordIsNotValid() {
  return new HttpException('Password is not valid', HttpStatus.UNAUTHORIZED);
}
