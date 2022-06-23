import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

@Schema()
export class UserDocument extends Document {
  @Prop({ _id: true })
  id: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
