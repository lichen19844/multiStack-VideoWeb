import { Controller } from '@nestjs/common';
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
}
