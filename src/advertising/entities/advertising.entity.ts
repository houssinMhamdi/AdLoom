import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Schedule } from 'src/scheduel/entities/scheduel.entity';


export type AdvertisingDocument = HydratedDocument<Advertising>;

@Schema()
export class TargetAudience {
  @Prop({ required: false })
  location?: string;

  @Prop({ required: false })
  capacity?: number;
}

@Schema({ timestamps: true })
export class Advertising {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  filePath: string;

  @Prop()
  fileType: string;

  @Prop({ type: TargetAudience, required: false })
  targetAudience?: TargetAudience;

  @Prop()
  createdBy: string;

  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }] }) // Array of Schedule references
  schedules: Schedule[];
  
}

export const AdvertisingSchema = SchemaFactory.createForClass(Advertising);
