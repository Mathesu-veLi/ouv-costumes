import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { userExists, userNotExistThrow } from '../../utils/validUserUtils';
import { generatePasswordHash } from '../../utils/generatePasswordHash';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const passwordHash = generatePasswordHash(createUserDto.password);
    return this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password_hash: passwordHash,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    if (!(await userExists(this.prismaService, id))) userNotExistThrow();

    return this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!(await userExists(this.prismaService, id))) userNotExistThrow();

    return this.prismaService.user.update({
      data: { ...updateUserDto },
      where: { id },
    });
  }

  async remove(id: number) {
    if (!(await userExists(this.prismaService, id))) userNotExistThrow();

    return this.prismaService.user.delete({ where: { id } });
  }
}
