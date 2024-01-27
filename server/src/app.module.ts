import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenModule } from './modules/token/token.module';

@Module({
  imports: [UsersModule, PrismaModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
