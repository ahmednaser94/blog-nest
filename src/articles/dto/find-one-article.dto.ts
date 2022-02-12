import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleIdParamDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: ObjectId;
}

export class FindOneArticleByTitleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
