import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from '@libs/db/models/user.model';
import { ModelType, ReturnModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from './current-user.decorator';

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
    private jwtService: JwtService,
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
  // async login(@Body() dto: LoginDto, @Req() req) {
    // async login(@Body() dto: LoginDto, @CurrentUser() user: DocumentType<User>) {
    async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
        // return req.user
    // return dto;
    // const payload = req.user._id
    return {
      // token: this.jwtService.sign(String(payload))
      token: this.jwtService.sign(String(user._id))
    }
  }

  // 检查token，获取个人验证信息
  @ApiBearerAuth()
  @Get('user')
  @ApiOperation({ summary: '获取个人验证信息' })
  @UseGuards(AuthGuard('jwt'))
  // async user(@Req() req) {
    // async user(@CurrentUser() user: DocumentType<User>) {
    async user(@CurrentUser() user: UserDocument) {
        return {user};
  }
}
