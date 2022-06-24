import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { Customer } from '../interfaces/customer.interface';
import { User } from '../../users/interfaces/user.interface';
import { Identity } from '../../identity/interfaces/identity.interface';
import mongooseAutopopulate from 'mongoose-autopopulate';
import { IdentityDocument } from '../../identity/schemas/identity.schema';
import { UserDocument } from '../../users/schemas/user.schema';

const transform = (document: CustomerDocument): Customer => {
  return {
    id: document.id,
    identity: JSON.parse(JSON.stringify(document.identity)),
    createdBy: JSON.parse(JSON.stringify(document.createdBy)),
  };
};

@Schema({
  collection: 'shapel_customers',
  timestamps: true,
  id: true,
  toObject: { transform },
  toJSON: { transform },
})
export class CustomerDocument extends mongoose.Document implements Customer {
  id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: IdentityDocument.name,
    required: true,
    autopopulate: true,
  })
  identity: Identity | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UserDocument.name,
    required: true,
    autopopulate: true,
  })
  createdBy: User | string;
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerDocument);
CustomerSchema.plugin(mongooseAutopopulate as any);
CustomerSchema.index({ createdBy: 1, identity: 1 }, { unique: true });
