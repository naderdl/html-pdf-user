import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type DocumentDocument = Document & MongooseDocument;

@Schema({
  id: true,
  toJSON: { virtuals: true, versionKey: false },
  toObject: { virtuals: true, versionKey: false },
})
export class Document {
  //   @Prop({ required: true })
  //   userId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  height: number;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
