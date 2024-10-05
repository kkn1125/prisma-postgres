import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import commonConf from './common/common.conf';

@Module({
  imports: [
    PostsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [commonConf],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
