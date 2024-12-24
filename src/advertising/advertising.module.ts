import { Module } from '@nestjs/common';
import { AdvertisingService } from './advertising.service';
import { AdvertisingController } from './advertising.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Advertising, AdvertisingSchema } from './entities/advertising.entity';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

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
    ]),
  ],
  controllers: [AdvertisingController],
  providers: [AdvertisingService],
  exports: [AdvertisingService],
})
export class AdvertisingModule {}
