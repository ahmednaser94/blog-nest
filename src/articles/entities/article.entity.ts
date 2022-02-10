import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Author } from 'src/authors/entities/author.entity';

export type ArticleDocument = Article & Document;

@Schema()
export class Comment {
  @Prop()
  body: string;

  @Prop({ default: () => +moment.utc().format('x') })
  createdAt: number;
}

@Schema({
  timestamps: {
    currentTime: () => +moment.utc().format('x'),
    createdAt: true,
    updatedAt: false,
  },
})
export class Article {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  body: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    autopopulate: true,
  })
  author: Author;

  @Prop({ type: [{ body: { type: String }, createdAt: Number }] })
  comments: Comment[];

  @Prop({ default: 0 })
  likes: number;

  @Prop()
  createdAt: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
