import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { AddCommentToArticleDto } from './dto/add-comment.dto';
import { Article, ArticleDocument } from './entities/article.entity';
import { ArticlesSort } from './interfaces';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = await this.articleModel.create(createArticleDto);

    return article;
  }

  async findAll(sortQuery?: string) {
    const sort: ArticlesSort = {};
    const availableSorts = ['likes'];

    if (sortQuery) {
      const [key, value] = sortQuery.split(':');
      if (availableSorts.includes(key)) {
        sort[key] = value === 'desc' ? -1 : 1;
      }
    }

    const articles = await this.articleModel.find().sort(sort);

    return articles;
  }

  async findOne(id: ArticleDocument['_id']) {
    const article = await this.articleModel.findById(id);

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async findByTitle(title: string) {
    const articles = await this.articleModel.find({
      $text: {
        $search: `"\"${title}\""`,
        $language: 'english',
        $caseSensitive: false
      }
    });

    return articles;
  }

  async incrementLikes(_id: ArticleDocument['_id']) {
    const article = await this.articleModel.findOneAndUpdate(
      { _id },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async addComment(
    _id: ArticleDocument['_id'],
    addCommentToArticleDto: AddCommentToArticleDto
  ) {
    const article = await this.articleModel.findOneAndUpdate(
      { _id },
      { $push: { comments: addCommentToArticleDto } },
      { new: true }
    );

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }
}
