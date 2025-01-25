import { invalidToken, noTokenProvided, tokenExpired } from '@/utils/throws';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class LoginRequiredMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) noTokenProvided();

    const [, token] = authorization.split(' ');

    try {
      verify(token, process.env.TOKEN_SECRET);

      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) tokenExpired();
      else invalidToken();
    }
  }
}
