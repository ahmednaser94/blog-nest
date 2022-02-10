import { IsString, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';

export class AddCommentToArticleDto {
  @IsString()
  body?: string;
}
