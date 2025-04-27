import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostEntity } from './entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('posts')
export class PostController {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  @Get()
  getPosts() {
    return this.postsRepository.find();
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postsRepository.insert(body);
  }
}
