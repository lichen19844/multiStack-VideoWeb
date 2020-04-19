import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Course
})

// 管理端admin接口文档
@ApiTags('课程')
@Controller('courses')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>
  ) { }
  
  // 对应管理端的前端this.$http.get("courses/option")
  @Get('option')
  async option() {
    return {
      searchMenuSpan: 8,
      title: '课程管理',
      column: [
        // { label: 'ID', prop: '_id' },
        { label: '课程名称', prop: 'name', sortable: true, search: true, regex: true, row: true, span: 24 },
        { label: '课程封面图', prop: 'cover', type: 'upload', listType: 'picture-img', width: 120, row: true, span: 12, action: 'upload' }
      ]
    }
  }
}
