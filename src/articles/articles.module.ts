import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './entities/article.entity';
import { Author, AuthorSchema } from '../authors/entities/author.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])
  ]
})
export class ArticlesModule {}
