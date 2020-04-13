import { prop, modelOptions, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Course } from './course.model'

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

  @ApiProperty({ description: '关联课程' })
  @prop({ ref: 'Course' })
  course: Ref<Course>
}