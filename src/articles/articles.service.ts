import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { AddCommentToArticleDto } from './dto/add-comment.dto';
import { Article, ArticleDocument } from './entities/article.entity';
import { ArticlesSort } from './interfaces';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = await this.articleModel.create(createArticleDto);

    return article;
  }

  async findAll(sortQuery?: string) {
    const sort: ArticlesSort = {};
    const availableSorts = ['likes'];

    if (sort) {
      const [key, value] = sortQuery.split(':');
      if (availableSorts.includes(key)) {
        sort[key] = value === 'desc' ? -1 : 1;
      }
    }

    const articles = await this.articleModel.find().sort(sort);

    return articles;
  }

  async findOne(id: ObjectId) {
    const article = await this.articleModel.findById(id);

    if (!article) {
      return { message: 'Article not found' };
    }

    return article;
  }

  async findByTitle(title: string) {
    const article = await this.articleModel.findOne({ title });

    if (!article) {
      return { message: 'Article not found' };
    }

    return article;
  }

  async incrementLikes(_id: ObjectId) {
    const article = await this.articleModel.findOneAndUpdate(
      { _id },
      { $inc: { likes: 1 } },
      { new: true },
    );

    if (!article) {
      return { message: 'Article not found' };
    }

    return article;
  }

  async addComment(
    _id: ObjectId,
    addCommentToArticleDto: AddCommentToArticleDto,
  ) {
    const article = await this.articleModel.findOneAndUpdate(
      { _id },
      { $push: { comments: addCommentToArticleDto } },
      { new: true },
    );

    if (!article) {
      return { message: 'Article not found' };
    }

    return article;
  }

  async remove(_id: ObjectId) {
    const deletedArticle = await this.articleModel.findOneAndDelete(
      { _id },
      { new: true },
    );

    if (!deletedArticle) {
      return { message: 'Article not found' };
    }

    return { message: 'Article deleted!' };
  }
}
