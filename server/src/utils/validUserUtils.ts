import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function userExists(prismaService: PrismaService, userId: number) {
  try {
    await prismaService.user.findUniqueOrThrow({ where: { id: userId } });
    return true;
  } catch (e) {
    return false;
  }
}

export function userNotExistThrow() {
  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
}
