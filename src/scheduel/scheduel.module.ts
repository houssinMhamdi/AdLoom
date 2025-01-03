import { Module } from '@nestjs/common';
import { SchedulesService } from './scheduel.service';
import { SchedulesController } from './scheduel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './entities/scheduel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class ScheduelModule {}
