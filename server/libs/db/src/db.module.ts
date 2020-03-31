import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';

// 把具体模型注册进来
const models = TypegooseModule.forFeature([
  User,
  Course,
  Episode
])

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost:27017/", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      dbName: "multiStack-VideoWeb"
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
