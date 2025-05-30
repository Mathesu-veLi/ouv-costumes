import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { PrismaService } from '@/prisma/prisma.module';
import {
  accessDenied,
  noTokenProvided,
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

    function getEnvOrThrow(name: string): string {
      const value = process.env[name];
      if (!value) {
        throw new Error(`Environment variable ${name} is missing`);
      }
      return value;
    }

    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      getEnvOrThrow('TOKEN_SECRET'),
      {
        expiresIn: getEnvOrThrow(
          'TOKEN_EXPIRATION',
        ) as `${number}${'s' | 'm' | 'h' | 'd'}`,
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
      noTokenProvided();
    }

    const [, token] = authorization.split(' ');

    let decoded;
    try {
      decoded = this.decode(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        tokenExpired();
      } else {
        console.log(e);
      }
    }
    if (decoded.role !== Role.Admin) {
      accessDenied();
    }
    return { message: 'Access authorized' };
  }

  private decode(token: string): IUserData {
    return verify(token, process.env.TOKEN_SECRET) as IUserData;
  }
}
