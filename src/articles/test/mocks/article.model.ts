import { ObjectId } from 'bson';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { Article, ArticleDocument } from 'src/articles/entities/article.entity';

const articlesDB: Article[] = [];

const createImplementation = async (
  dto: CreateArticleDto
): Promise<Article> => {
  const createdArticle: Article = {
    ...dto,
    _id: new ObjectId() as any,
    createdAt: 1644654447,
    comments: [],
    likes: 0
  };

  articlesDB.push(createdArticle);

  return Promise.resolve(createdArticle);
};

const create = jest.fn().mockImplementation(createImplementation);

const findImplementation = async (): Promise<Article[]> => {
  return Promise.resolve(articlesDB);
};

const find = jest.fn().mockImplementation(findImplementation);

const findByTitleImplementation = async (
  filter: FilterQuery<ArticleDocument>
): Promise<Article> => {
  const foundArticle = articlesDB.find(
    (article) => article.title == filter.title
  );

  return Promise.resolve(foundArticle);
};

const findByTitle = jest.fn().mockImplementation(findByTitleImplementation);

const findByIdImplementation = async (_id: string): Promise<Article> => {
  const foundArticle = articlesDB.find((article) => article._id == _id);

  return Promise.resolve(foundArticle);
};

const findById = jest.fn().mockImplementation(findByIdImplementation);

const findOneAndUpdateImplementation = async (
  filter: FilterQuery<ArticleDocument>,
  updates: UpdateQuery<ArticleDocument>
): Promise<Article> => {
  const foundArticle = articlesDB.find((article) => article._id == filter._id);

  if (!foundArticle) {
    return Promise.reject(undefined);
  }

  if (updates.$set) {
    for (const [key, value] of Object.entries(updates.$set)) {
      if (key == 'comments') {
        foundArticle.comments.push(value);
      }
    }
  }

  if (updates.$inc) {
    for (const [key] of Object.entries(updates.$set)) {
      if (key == 'likes') {
        foundArticle.likes += 1;
      }
    }
  }

  return Promise.resolve(foundArticle);
};

const findOneAndUpdate = jest
  .fn()
  .mockImplementation(findOneAndUpdateImplementation);

export const articleModel = {
  create,
  find,
  findOne: findByTitle,
  findById,
  findOneAndUpdate,
  defaultImplementations: {
    create: createImplementation,
    find: findImplementation,
    findOne: findByTitleImplementation,
    findById: findByIdImplementation,
    findOneAndUpdate: findOneAndUpdateImplementation
  }
};
