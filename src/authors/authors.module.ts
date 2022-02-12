import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './entities/author.entity';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    ArticlesModule
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])
  ]
})
export class AuthorsModule {}
