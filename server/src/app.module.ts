import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenModule } from './modules/token/token.module';
import { LoginRequiredMiddleware } from './middlewares/loginRequired';
import { ProductsModule } from './modules/products/products.module';
import { CheckoutsModule } from './modules/checkouts/checkouts.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { UploadModule } from './modules/upload/upload.module';
import { AdminRequiredMiddleware } from './middlewares/adminRequired';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    TokenModule,
    ProductsModule,
    CheckoutsModule,
    JwtModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginRequiredMiddleware)
      .forRoutes(
        { path: 'users/:id', method: RequestMethod.PATCH },
        { path: 'users/:id', method: RequestMethod.DELETE },
      );
    consumer
      .apply(AdminRequiredMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        { path: 'products/:id', method: RequestMethod.PUT },
        { path: 'products/:id', method: RequestMethod.DELETE },
        { path: 'users/:id', method: RequestMethod.GET },
        { path: 'upload', method: RequestMethod.POST },
        { path: 'upload', method: RequestMethod.DELETE },
      );
  }
}
