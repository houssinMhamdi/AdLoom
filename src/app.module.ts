import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdvertisingModule } from './advertising/advertising.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { RolesGuard } from './auth/guard/roles.guard';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://houssinoss010203:sIJTAJoc0ovPLPsW@adloomdb.wnm6o.mongodb.net/?retryWrites=true&w=majority&appName=adloomdb',
    ),
    UserModule,
    AuthModule,
    AdvertisingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
