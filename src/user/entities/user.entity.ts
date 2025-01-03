import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProfileStatus, UerRole, Status } from '../Enums/Roles';
import { v4 as uuidv4 } from 'uuid'; 

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ default: () => uuidv4(), unique: true })
  appId: string;

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

  @Prop({ default: 1})
  deviceNumber:number

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

UserSchema.pre("save",function (next){
  if (!this.appId) {
    this.appId = uuidv4(); 
  }
  next()
});
