import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Url {
  @Prop({ required: true })
  shortenUrl: string;
  @Prop({ required: true })
  redirectUrl: string;
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
