import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { PrismaService } from '@/prisma/prisma.module';
import { passwordIsNotValid, userNotExist } from '@/utils/throws';
import { sign } from 'jsonwebtoken';
import { passwordIsValid } from '@/utils/passwordUtils';

@Injectable()
export class TokenService {
  constructor(private prismaService: PrismaService) {}

  async create(createTokenDto: CreateTokenDto) {
    const { id, email, password_hash } =
      await this.prismaService.user.findUnique({
        where: { email: createTokenDto.email },
      });
    if (!id) userNotExist();
    if (!passwordIsValid(createTokenDto.password, password_hash))
      return passwordIsNotValid();

    const token = sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return { token };
  }
}
