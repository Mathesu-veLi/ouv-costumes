import { HttpException, HttpStatus } from '@nestjs/common';

export function userNotExist() {
  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
}
