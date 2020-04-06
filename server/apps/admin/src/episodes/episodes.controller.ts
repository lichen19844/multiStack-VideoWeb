import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
  model: Episode
})

@ApiTags('episode')
@Controller('episodes')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>
  ){  }

  // 对应前端this.$http.get("episodes/option")
  @Get('option')
  async option() {
    return {
      title: '课时管理',
      column: [
        // { label: 'ID', prop: '_id' },
        { label: '课时名称', prop: 'name' },
        { label: '课时文件', prop: 'file' }
      ]
    }
  }
}
