// 设置本地策略

import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';


export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
  ) {
    super({
      // 取出token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 解密token
      secretOrKey: process.env.SECRET
    } as StrategyOptions);
  }

  async validate(id) {
    return await this.UserModel.findById(id)
  }
}
