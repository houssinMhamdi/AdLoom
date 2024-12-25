import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProfileStatus, UerRole, Status } from '../Enums/Roles';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UerRole })
  role: string;

  @Prop({ default: 'incomplete', enum: Status })
  status: string;

  @Prop({ default: 'inactive', enum: ProfileStatus })
  profileStatus: string;

  // Fields for Advertiser
  @Prop()
  companyName?: string;

  @Prop()
  businessType?: string;
 
  @Prop()
  licenseNumber?: string;

  @Prop()
  location?: string;

  // Fields for Venue Owner
  @Prop()
  venueName?: string;

  @Prop()
  venueType?: string;

  @Prop()
  numberOfTVs?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
