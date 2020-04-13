import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    MulterModule.register({
      // dest: './uploads'
      // 也可以写成 dest: 'uploads'，会在server目录下自动生成文件夹
      storage: MAO({
        config: {
            region: 'oss-cn-hongkong',
            accessKeyId: 'xxx',
            accessKeySecret: 'xxx',
            bucket: 'multistack-videoweb'
        }
      })
    }),
    DbModule,
    UsersModule,
    CoursesModule,
    EpisodesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
