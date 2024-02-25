import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { PrismaService } from '@/prisma/prisma.module';
import { passwordIsNotValid, userNotExists } from '@/utils/throws';
import { sign } from 'jsonwebtoken';
import { passwordIsValid } from '@/utils/passwordUtils';

@Injectable()
export class TokenService {
  constructor(private prismaService: PrismaService) {}

  async create(createTokenDto: CreateTokenDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: createTokenDto.email },
    });
    if (!user) return userNotExists();
    if (!(await passwordIsValid(createTokenDto.password, user.password_hash)))
      return passwordIsNotValid();

    const token = sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      },
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}
