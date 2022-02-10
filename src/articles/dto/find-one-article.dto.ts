import { IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ArticleIdParamDto {
  @IsMongoId()
  _id: ObjectId;
}

export class FindOneArticleByTitleDto {
  @IsString()
  title: string;
}
