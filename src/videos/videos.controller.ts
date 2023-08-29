import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/utils/logger/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/media.handler';

@ApiTags('videos')
@Controller('videos')
@UseInterceptors(LoggerInterceptor)
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log(createVideoDto);
    return createVideoDto;
    // return this.videosService.create(createVideoDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar', { storage }))
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file;
  }

  @Get() //TODO: http://localhost:3000/videos?id=77&description=holaamigo
  findAll(@Query() query: any) {
    return this.videosService.findAll();
  }

  @Get(':id') //TODO: http://localhost:3000/videos/video1
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
