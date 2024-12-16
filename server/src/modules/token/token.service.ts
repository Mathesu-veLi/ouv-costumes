import { HttpCode, Injectable, Response } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { PrismaService } from '@/prisma/prisma.module';
import { passwordIsNotValid, userNotExists } from '@/utils/throws';
import { sign, verify } from 'jsonwebtoken';
import { passwordIsValid } from '@/utils/passwordUtils';

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

  decode(authorization: string) {
    const token = authorization.slice(7, authorization.length);

    const decoded = verify(token, process.env.TOKEN_SECRET);
    return decoded;
  }
}
