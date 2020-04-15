import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          // dest: './uploads'
          // 也可以写成 dest: 'uploads'，会在server目录下自动生成文件夹
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET
            }
          })
        }
      }
    }),
    // MulterModule.register({
    //   // dest: './uploads'
    //   // 也可以写成 dest: 'uploads'，会在server目录下自动生成文件夹
    //   storage: MAO({
    //     config: {
    //         region: 'oss-cn-hongkong',
    //         accessKeyId: 'LTAI4FvEU3mcHYkR9fT9iDk7',
    //         accessKeySecret: 'rII2AXbs47gxg8ZySSzHJ3rsfmtBho',
    //         bucket: 'multistack-videoweb'
    //     }
    //   })
    // }),
    // DbModule,
    UsersModule,
    CoursesModule,
    EpisodesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
