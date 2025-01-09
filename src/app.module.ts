import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdvertisingModule } from './advertising/advertising.module';
import { ScheduelModule } from './scheduel/scheduel.module';
import { AdAdminAssinmentModule } from './ad-admin-assinment/ad-admin-assinment.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://houssinoss010203:sIJTAJoc0ovPLPsW@adloomdb.wnm6o.mongodb.net/?retryWrites=true&w=majority&appName=adloomdb',
    ),
    UserModule,
    AuthModule,
    AdvertisingModule,
    ScheduelModule,
    AdAdminAssinmentModule,
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
