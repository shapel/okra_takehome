import { Prop, Schema, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import {
  BankAccount,
  Enrollment,
  Identity,
} from '../interfaces/identity.interface';
import { BVN } from '../values/bvn';
import { NIN } from '../values/nin';

const transform = (document: IdentityDocument): Identity => {
  return {
    id: document.id,
    bvn: document.bvn,
    nin: document.nin,
    bankAccounts: document.bankAccounts,
    accountLevel: document.accountLevel,
    addresses: document.addresses,
    birthDate: document.birthDate,
    emails: document.emails,
    firstName: document.firstName,
    lastName: document.lastName,
    middleName: document.middleName,
    enrollment: document.enrollment,
    fullName: document.fullName,
    gender: document.gender,
    lgaOrigin: document.lgaOrigin,
    lgaResidence: document.lgaResidence,
    maritalStatus: document.maritalStatus,
    nationality: document.nationality,
    onWatchlist: document.onWatchlist,
    phones: document.phones,
    photos: document.photos,
    stateOrigin: document.stateOrigin,
    stateResidence: document.stateResidence,
    verificationCountry: document.verificationCountry,
  };
};

@Schema({
  collection: 'shapel_identities',
  timestamps: true,
  id: true,
  toObject: { transform },
  toJSON: { transform },
})
export class IdentityDocument extends Document implements Identity {
  id: string;
  @Prop({ required: true, unique: true })
  bvn: BVN;
  @Prop({ required: true })
  birthDate: Date;
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  middleName: string;
  @Prop({ required: true })
  emails: string[];
  @Prop({ required: true })
  addresses: string[];
  @Prop({ required: true })
  phones: string[];
  @Prop({ required: true })
  bankAccounts: BankAccount[];
  @Prop({ required: true, unique: true })
  nin: NIN;
  @Prop({ required: true })
  lgaOrigin: string;
  @Prop({ required: true })
  lgaResidence: string;
  @Prop({ required: true })
  nationality: string;
  @Prop({ required: true })
  stateResidence: string;
  @Prop({ required: true })
  stateOrigin: string;
  @Prop(
    raw({
      bank: { type: String },
      registrationDate: { type: Date },
    }),
  )
  enrollment: Enrollment;
  @Prop({ required: true })
  onWatchlist: boolean;
  @Prop({ required: true })
  maritalStatus: string;
  @Prop({ required: true })
  accountLevel: string;
  @Prop({ required: true })
  verificationCountry: string;
  @Prop({ required: true })
  gender: string;
  @Prop({ required: true })
  photos: string[];
}

export const IdentitySchema = SchemaFactory.createForClass(IdentityDocument);
