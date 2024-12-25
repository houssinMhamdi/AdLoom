import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}

export const AdvertisingSchema = SchemaFactory.createForClass(Advertising);
