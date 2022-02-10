import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
// import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author, AuthorDocument } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = await this.authorModel.create(createAuthorDto);

    return author;
  }

  async findAll() {
    const authors = await this.authorModel.find();

    return authors;
  }

  async findOne(id: ObjectId) {
    const author = await this.authorModel.findById(id);

    if (!author) {
      return { message: 'Author not found' };
    }

    return author;
  }

  async update(_id: ObjectId, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorModel.findOneAndUpdate(
      { _id },
      { $set: { name: updateAuthorDto.name } },
    );

    if (!author) {
      return { message: 'Article not found' };
    }

    return author;
  }

  async remove(_id: ObjectId) {
    const deletedAuthor = await this.authorModel.findOneAndDelete(
      { _id },
      { new: true },
    );

    if (!deletedAuthor) {
      return { message: 'Author not found' };
    }

    return { message: 'Author deleted!' };
  }
}
