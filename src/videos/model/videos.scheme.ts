import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type VideosDocument = Videos & Document;

@Schema({ timestamps: true })
export class Videos {
  @Prop({ required: true })
  tittle: string;

  @Prop()
  idCourse: mongoose.Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  source: string;

  @Prop()
  score: string;
}

export const VideosSchema = SchemaFactory.createForClass(Videos);
