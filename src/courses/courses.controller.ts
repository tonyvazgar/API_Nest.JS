import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { SlugPipe } from './slug/slug.pipe';
import { BrowserAgentGuard } from 'src/guards/browser-agent/browser-agent.guard';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(BrowserAgentGuard)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get(':title')
  getDetail(@Param('title', new SlugPipe()) title: number) {
    return this.coursesService.findOne(1);
  }
}
