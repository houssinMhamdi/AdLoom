import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ timestamps: true })
export class Schedule {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advertising',
    required: true,
  })
  adId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  duration: number;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
