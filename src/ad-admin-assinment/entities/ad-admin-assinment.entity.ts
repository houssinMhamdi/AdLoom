import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AdAssignmentDocument = HydratedDocument<AdAssignment>;

@Schema({ timestamps: true })
export class AdAssignment {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  ad_id: string;

  @Prop({ required: true })
  device_id: number;

  @Prop({ default: 'admin' })
  assigned_by: string;
}

export const AdAssignmentSchema = SchemaFactory.createForClass(AdAssignment);
