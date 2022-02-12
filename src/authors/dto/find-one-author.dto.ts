import { IsMongoId, IsNotEmpty } from 'class-validator';
import { AuthorDocument } from '../entities/author.entity';

export class AuthorIdParamDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: AuthorDocument['_id'];
}
