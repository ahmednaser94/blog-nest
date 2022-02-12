import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AuthorDocument = Author & Document<ObjectId | string>;

@Schema({
  timestamps: {
    currentTime: () => +moment.utc().format('x'),
    createdAt: true,
    updatedAt: false,
  },
  versionKey: false,
})
export class Author {
  @ApiProperty({
    example: '62055430c52b99d17554c9c6',
  })
  _id?: ObjectId | string;

  @ApiProperty({ example: 'Ahmed Naser' })
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @ApiProperty({ example: 'Web developer' })
  @Prop({
    required: true,
  })
  jobTitle: string;

  @ApiProperty({ example: 1644654447 })
  @Prop()
  createdAt: number;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
