import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Course
})

@ApiTags('课程')
@Controller('courses')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>
  ) { }
  
  // 对应前端this.$http.get("courses/option")
  @Get('option')
  async option() {
    return {
      title: '课程管理',
      column: [
        // { label: 'ID', prop: '_id' },
        { label: '课程名称', prop: 'name' },
        { label: '课程封面图', prop: 'cover' }
      ]
    }
  }
}
