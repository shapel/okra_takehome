import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';
import { User } from '../interfaces/user.interface';

const transform = (document: UserDocument): User => {
  return {
    id: document.id,
    email: document.email,
    firstName: document.firstName,
    lastName: document.lastName,
  };
};
@Schema({
  collection: 'shapel_users',
  timestamps: true,
  id: true,
  toObject: { transform },
  toJSON: { transform },
})
export class UserDocument extends Document {
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
