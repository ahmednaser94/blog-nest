import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AuthorDocument } from '../../authors/entities/author.entity';
import { ApiProperty } from '@nestjs/swagger';

export type ArticleDocument = Article & Document<mongoose.ObjectId | string>;

@Schema()
export class Comment {
  @Prop()
  @ApiProperty({
    example: 'random comment body'
  })
  body: string;

  @ApiProperty({ example: 1644654447 })
  @Prop({ default: () => +moment.utc().format('x') })
  createdAt?: number;
}

@Schema({
  autoIndex: true,
  timestamps: {
    currentTime: () => +moment.utc().format('x'),
    createdAt: true,
    updatedAt: false
  },
  versionKey: false
})
export class Article {
  @ApiProperty({
    example: '62055430c52b99d17554c9c6'
  })
  _id?: mongoose.ObjectId | string;

  @Prop({
    required: true,
    index: 'text'
  })
  @ApiProperty({
    example: 'Article title'
  })
  title: string;

  @Prop({
    required: true
  })
  @ApiProperty({
    example: 'Article body'
  })
  body: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    autopopulate: true
  })
  @ApiProperty({
    example: '62055430c52b99d17554c9c6'
  })
  author: AuthorDocument['_id'];

  @ApiProperty({
    type: [Comment]
  })
  @Prop({ type: [{ body: { type: String }, createdAt: Number }] })
  comments: Comment[];

  @ApiProperty()
  @Prop({ default: 0 })
  likes: number;

  @Prop()
  @ApiProperty({ example: 1644654447 })
  createdAt: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

ArticleSchema.index({ title: 'text' });
