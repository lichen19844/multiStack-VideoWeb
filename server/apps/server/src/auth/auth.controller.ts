import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ModelType, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// // 定义DTO数据传输对象
// export class RegisterDto {
//   @ApiProperty()
//   username: string;
//   @ApiProperty()
//   password: string;
// }

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    // @InjectModel(User) private readonly UserModel: ModelType<User>
    // @InjectModel(User) private readonly UserModel: ModelType<typeof User>
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
  ) {}

  // 注册
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;
    const user = await this.UserModel.create({
      username,
      password,
    });
    // const user = await this.UserModel.findOne()
    return {
      user,
      success: true,
    };
  }

  // 登录
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @Req() req) {
    return req.user
    // return dto;
  }

  // 检查token，获取个人验证信息
  @Get('user')
  @ApiOperation({ summary: '获取个人验证信息' })
  async user() {
    return {};
  }
}
