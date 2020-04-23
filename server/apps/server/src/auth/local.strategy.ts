// 设置本地策略

import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
  ) {
    super({
      // usernameField: 'mobile',
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.UserModel.findOne({
      username,
    }).select('+password');
    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确！');
    }
    // 会执行compareSync方法
    return user;
  }
}
