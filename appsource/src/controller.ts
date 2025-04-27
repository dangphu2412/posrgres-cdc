import { Body, Controller, Delete, Get, Inject, Logger, OnModuleInit, Param, Post, Put } from '@nestjs/common';
import { PostEntity } from './entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Controller('posts')
export class PostController implements OnModuleInit {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async onModuleInit() {
    await this.cacheManager.clear();
    Logger.log('clear cache')
  }



  @Get()
  async getPosts() {
    const cached = await this.cacheManager.get('posts');

    if (cached) {
      Logger.log('Cache hit')
      return cached;
    }

    const posts = await this.postsRepository.find();

    await this.cacheManager.set('posts', posts, 10000); // 1mins
    Logger.log('Cache saved in 1min')

    return posts;
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postsRepository.insert(body);
  }

  @Put(':id')
  updatePost(@Param() id: string, @Body() body: any) {
    return this.postsRepository.update(id, body);
  }

  @Delete(':id')
  deletePost(@Param() id: string) {
    return this.postsRepository.delete(id);
  }
}
