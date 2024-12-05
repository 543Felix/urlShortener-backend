import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Otp {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({ required: true })
  otp: string;

  @Prop({ type: Date, expires: '1m', default: Date.now })
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
