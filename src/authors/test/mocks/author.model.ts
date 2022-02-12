import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { Author, AuthorDocument } from 'src/authors/entities/author.entity';
import { ObjectId } from 'bson';
import { FilterQuery, UpdateQuery } from 'mongoose';

const authorsDB: Author[] = [];

const createImplementation = async (dto: CreateAuthorDto): Promise<Author> => {
  const createdAuthor = {
    ...dto,
    _id: new ObjectId() as any,
    createdAt: 1644654447
  };

  authorsDB.push(createdAuthor);

  return Promise.resolve(createdAuthor);
};

const create = jest.fn().mockImplementation(createImplementation);

const findImplementation = async (): Promise<Author[]> => {
  return Promise.resolve(authorsDB);
};

const find = jest.fn().mockImplementation(findImplementation);

const findByNameImplementation = async (
  filter: FilterQuery<AuthorDocument>
): Promise<Author> => {
  const foundAuthor = authorsDB.find((author) => author.name == filter.name);

  return Promise.resolve(foundAuthor);
};

const findByName = jest.fn().mockImplementation(findByNameImplementation);

const findByIdImplementation = async (_id: string): Promise<Author> => {
  const foundAuthor = authorsDB.find((author) => author._id == _id);

  return Promise.resolve(foundAuthor);
};

const findById = jest.fn().mockImplementation(findByIdImplementation);

const findOneAndUpdateImplementation = async (
  filter: FilterQuery<AuthorDocument>,
  updates: UpdateQuery<AuthorDocument>
): Promise<Author> => {
  const foundAuthor = authorsDB.find((author) => author._id == filter._id);

  if (!foundAuthor) {
    return Promise.reject(undefined);
  }

  foundAuthor.name = updates.$set.name;

  return Promise.resolve(foundAuthor);
};

const findOneAndUpdate = jest
  .fn()
  .mockImplementation(findOneAndUpdateImplementation);

export const authorModel = {
  create,
  find,
  findOne: findByName,
  findById,
  findOneAndUpdate,
  defaultImplementations: {
    create: createImplementation,
    find: findImplementation,
    findOne: findByNameImplementation,
    findById: findByIdImplementation,
    findOneAndUpdate: findOneAndUpdateImplementation
  }
};
