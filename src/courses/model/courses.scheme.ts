import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CourseDocument = Course & Document;

export class Course {
  @Prop({ required: true })
  title: string;
  
  @Prop()
  idAuthor: mongoose.Types.ObjectId;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  cover: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);