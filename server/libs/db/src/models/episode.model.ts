import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class Episode {
  @ApiProperty({ description: '课时名称' })
  @prop()
  name: string

  @ApiProperty({ description: '视频\音频\图片' })
  @prop()
  file: string

}