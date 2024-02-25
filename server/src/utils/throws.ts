import { HttpException, HttpStatus } from '@nestjs/common';

export function userNotExists() {
  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
}

export function userAlreadyExist() {
  throw new HttpException('User already exist', HttpStatus.CONFLICT);
}

export function passwordIsNotValid() {
  throw new HttpException('Password is not valid', HttpStatus.UNAUTHORIZED);
}
