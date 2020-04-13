import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Episode } from './episode.model'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class Course {
  @ApiProperty({ description: '课程名称', example: 'course1' })
  @prop()
  name: string

  @ApiProperty({ description: '封面图', example: 'cover1' })
  @prop()
  cover: string

  // // 课程里放很多课时（视频\音频\图片）
  // @arrayProp({itemsRef: 'Episode', example: 'episode1'})
  // episodes: Ref<Episode>[]
}