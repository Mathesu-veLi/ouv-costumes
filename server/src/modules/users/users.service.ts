import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.module';
import { userAlreadyExist, userNotExists } from '../../utils/throws';
import { generatePasswordHash } from '../../utils/passwordUtils';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = generatePasswordHash(createUserDto.password);
    const user = await this.prismaService.user
      .create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password_hash: passwordHash,
        },
      })
      .catch((e) => {
        if (e.code === 'P2002') userAlreadyExist();
      });

    return user;
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user
      .findUniqueOrThrow({
        where: { id },
      })
      .catch(() => userNotExists());

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const passwordHash = generatePasswordHash(updateUserDto.password);
    await this.prismaService.user
      .findUniqueOrThrow({
        where: { id },
      })
      .catch(() => userNotExists());

    return await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto, password_hash: passwordHash },
    });
  }

  async remove(id: number) {
    await this.prismaService.user
      .findUniqueOrThrow({
        where: { id },
      })
      .catch(() => userNotExists());

    return this.prismaService.user.delete({ where: { id } });
  }
}
