import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { PrismaService } from '@/prisma/prisma.module';
import {
  accessDenied,
  passwordIsNotValid,
  tokenExpired,
  userNotExists,
} from '@/utils/throws';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { passwordIsValid } from '@/utils/passwordUtils';
import { IUserData } from '@/interfaces/IUserData';
import { Role } from '@prisma/client';

@Injectable()
export class TokenService {
  constructor(private prismaService: PrismaService) {}

  async create(createTokenDto: CreateTokenDto) {
    const user = await this.prismaService.users.findUnique({
      where: { email: createTokenDto.email },
    });
    if (!user) return userNotExists();

    if (!passwordIsValid(createTokenDto.password, user.password))
      return passwordIsNotValid();

    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      },
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  authorize(authorization: string) {
    if (!authorization) {
      accessDenied();
    }

    const token = authorization.slice(7, authorization.length);
    try {
      const decoded = this.decode(token);

      if (decoded.role !== Role.Admin) {
        accessDenied();
      }
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        tokenExpired();
      } else {
        console.log(e);
      }
    }

    return { message: 'Access authorized' };
  }

  private decode(token: string): IUserData {
    return verify(token, process.env.TOKEN_SECRET) as IUserData;
  }
}
