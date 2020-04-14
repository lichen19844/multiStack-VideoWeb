import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model: Episode
})

@ApiTags('episode')
@Controller('episodes')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course) private readonly courseModel: ReturnModelType<typeof Course>
  ){  }

  // 对应前端this.$http.get("episodes/option")
  @Get('option')
  async option() {
    const courses = (await this.courseModel.find()).map(v => ({
      label: v.name,
      value: v._id
    }))
    return {
      title: '课时管理',
      // translate: false,
      column: [
        // { label: 'ID', prop: '_id' },
        { label: '所属课程', prop: 'course', row: true, type: 'select', dicData: courses },
        { label: '课时名称', prop: 'name', row: true, span: 12 },
        { label: '课时文件', prop: 'file', row: true, span: 12, type: 'upload', listType: 'picture-img', width: '120px', action: 'upload' }
      ]
    }
  }
}
