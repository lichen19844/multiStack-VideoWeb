import { prop, modelOptions, DocumentType } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from "bcryptjs";

export type UserDocument = DocumentType<User>

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class User {
  @ApiProperty({ description: '用户名', example: 'user1', title: '哈哈' })
  @prop()
  username: string

  @ApiProperty({ description: '密码', example: 'pass1' })
  @prop({
    select: false,
    get (val) {
      return val
    },
    set (val) {
      // hashSync第一个参数是个字符串，不能为空，防空值报错做个判断
      return val ? hashSync(val, 10) : val
    }
  })
  password: string
}