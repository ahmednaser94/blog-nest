import { IsString, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsMongoId()
  author: ObjectId;
}
