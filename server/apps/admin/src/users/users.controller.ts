import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { ModelType, ReturnModelType } from '@typegoose/typegoose/lib/types';

@Crud({
  model: User
})

@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(
    // @InjectModel(User) private readonly model: ModelType<User>
    @InjectModel(User) private readonly model: ReturnModelType<typeof User>
  ) {  }

  // 对应前端this.$http.get("users/option")
  @Get('option')
  async option() {
    return {
      title: '用户管理',
      column: [
        // { label: 'ID', prop: '_id' },
        { label: '用户名', prop: 'username' },
        { label: '密码', prop: 'password' }
      ]
    }
  }
}
