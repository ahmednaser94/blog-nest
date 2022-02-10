import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema({
  timestamps: {
    currentTime: () => +moment.utc().format('x'),
    createdAt: true,
    updatedAt: false,
  },
})
export class Author {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  jobTitle: string;

  @Prop()
  createdAt: number;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
