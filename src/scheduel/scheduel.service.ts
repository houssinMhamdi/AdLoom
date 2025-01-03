import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from '../scheduel/entities/scheduel.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
  ) {}

  async create(createScheduleDto: Partial<Schedule>): Promise<Schedule> {
    const createdSchedule = new this.scheduleModel(createScheduleDto);
    return createdSchedule.save();
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleModel.find().exec();
  }

  async findOne(adId: string): Promise<Schedule> {
    return this.scheduleModel.findOne({ adId }).exec();
  }

  async update(
    adId: string,
    updateScheduleDto: Partial<Schedule>,
  ): Promise<Schedule> {
    return this.scheduleModel
      .findOneAndUpdate({ adId }, updateScheduleDto, { new: true })
      .exec();
  }

  async delete(adId: string): Promise<Schedule> {
    return this.scheduleModel.findOneAndDelete({ adId }).exec();
  }
}
