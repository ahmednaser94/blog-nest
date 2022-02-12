import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/entities/article.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author, AuthorDocument } from './entities/author.entity';
@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const isExists = await this.authorModel.findOne({
      name: createAuthorDto.name
    });

    if (isExists) {
      throw new BadRequestException('There is an author with this name');
    }

    const author = await this.authorModel.create(createAuthorDto);

    return author;
  }

  async findAll() {
    const authors = await this.authorModel.find();

    return authors;
  }

  async findOne(id: AuthorDocument['_id']) {
    const author = await this.authorModel.findById(id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  async findAuthorArticles(id: AuthorDocument['_id']) {
    const isExists = await this.authorModel.findById(id);

    if (!isExists) {
      throw new NotFoundException('There is no author with this _id');
    }

    const articles = await this.articleModel.find({ author: id });

    return articles;
  }

  async update(_id: AuthorDocument['_id'], updateAuthorDto: UpdateAuthorDto) {
    const isExists = await this.authorModel.findById(_id);

    if (!isExists) {
      throw new NotFoundException('Author not found');
    }

    const isNameExists = await this.authorModel.findOne({
      name: updateAuthorDto.name
    });

    if (isNameExists) {
      throw new BadRequestException('There is an author with this name');
    }

    const author = await this.authorModel.findOneAndUpdate(
      { _id },
      { $set: { name: updateAuthorDto.name } },
      { new: true }
    );

    return author;
  }

  // async remove(_id: ObjectId) {
  //   const deletedAuthor = await this.authorModel.findOneAndDelete(
  //     { _id },
  //     { new: true },
  //   );

  //   if (!deletedAuthor) {
  //     throw new NotFoundException('Author not found');
  //   }

  //   return { message: 'Author deleted!' };
  // }
}
