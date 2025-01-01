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

export function productAlreadyExists() {
  throw new HttpException('Product already exist', HttpStatus.CONFLICT);
}

export function productNotExists() {
  throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
}

export function accessDenied() {
  throw new HttpException('Access denied', HttpStatus.UNAUTHORIZED);
}

export function tokenExpired() {
  throw new HttpException('Token expired, please log in again', 498);
}
