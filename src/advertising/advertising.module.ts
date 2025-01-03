import { Module } from '@nestjs/common';
import { AdvertisingService } from './advertising.service';
import { AdvertisingController } from './advertising.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Advertising, AdvertisingSchema } from './entities/advertising.entity';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { Schedule, ScheduleSchema } from 'src/scheduel/entities/scheduel.entity';


@Module({
  imports: [
    MulterModule.register({
      dest: join(__dirname, '..', 'uploads'),
    }),
    MongooseModule.forFeature([
      {
        name: Advertising.name,
        schema: AdvertisingSchema,
      },
      { name: Schedule.name, schema: ScheduleSchema },
     
    ]),
  ],
  controllers: [AdvertisingController],
  providers: [AdvertisingService],
  exports: [AdvertisingService],
})
export class AdvertisingModule {}
