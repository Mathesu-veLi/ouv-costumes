import { HttpException, HttpStatus } from '@nestjs/common';

export function userNotExistThrow() {
  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
}
