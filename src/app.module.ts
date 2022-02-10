import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsModule } from './authors/authors.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ArticlesModule,
    AuthorsModule,
    RouterModule.register([
      {
        path: '/v1',
        module: ArticlesModule,
      },
      {
        path: '/v1',
        module: AuthorsModule,
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost/blog', {
      connectionFactory: (connection) => {
        // connection.plugin(autoPopulate);
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
