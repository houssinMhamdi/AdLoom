import { Module } from '@nestjs/common';
import { AdAdminAssinmentService } from './ad-admin-assinment.service';
import { AdAdminAssinmentController } from './ad-admin-assinment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdAssignment, AdAssignmentSchema } from './entities/ad-admin-assinment.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Advertising } from 'src/advertising/entities/advertising.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdAssignment.name, schema: AdAssignmentSchema },
      { name: User.name, schema: UserSchema },
      { name: Advertising.name, schema: AdAssignmentSchema },
    ]),
  ],
  controllers: [AdAdminAssinmentController],
  providers: [AdAdminAssinmentService],
})
export class AdAdminAssinmentModule {}
