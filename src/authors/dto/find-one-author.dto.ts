import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AuthorIdParamDto {
  @IsMongoId()
  _id: ObjectId;
}
