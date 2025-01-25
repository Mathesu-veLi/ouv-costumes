import { IUserData } from '@/interfaces/IUserData';
import {
  accessDenied,
  invalidToken,
  noTokenProvided,
  tokenExpired,
} from '@/utils/throws';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AdminRequiredMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) noTokenProvided();

    const [, token] = authorization.split(' ');

    let loginPayload;
    try {
      loginPayload = this.decode(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) tokenExpired();
      else {
        console.log(e);
        invalidToken();
      }
    }

    if (loginPayload.role !== Role.Admin) accessDenied();
    return next();
  }

  private decode(token: string): IUserData {
    return verify(token, process.env.TOKEN_SECRET) as IUserData;
  }
}
