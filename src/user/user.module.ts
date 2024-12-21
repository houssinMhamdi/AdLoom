import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService,{
    provide: APP_GUARD,
    useClass: RolesGuard, 
  },],
  exports: [UserService],

})
export class UserModule {}
