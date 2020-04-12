import { Controller, Get, Post, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  // async upload (@Req() req) {
  //   return req.file
  // }
  async upload (@UploadedFile('file') file) {
    console.log(file)
    // return {
    //   // url: `http://localhost:3000/${file.path}`
    //   // url: `http://localhost:3000/uploads/${file.filename}`
    //   // 配合aliyun云存储
    //   url: file.url
    // }
    // 配合aliyun云存储
    return file
  }
}
