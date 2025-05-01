import {
  Body,
  Controller,
  Delete,
  Get,
  Inject, Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  In,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { merge } from 'lodash';

@Entity('posts') // Specifies the table name as 'posts'
export class PostEntity {
  @PrimaryGeneratedColumn('uuid') // Auto-generates a UUID for the primary key
  id: string;

  @Column({ length: 255 }) // Standard column for the title
  title: string;

  @Column({ type: 'text' }) // Column for longer content, maps to TEXT type in Postgres
  content: string;

  @CreateDateColumn({ type: 'timestamp with time zone' }) // Automatically set on creation
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' }) // Automatically set on creation and update
  updatedAt: Date;
}

@Controller('posts')
export class PostController {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @Inject(CACHE_MANAGER)
    private cache: Cache,
  ) {}

  @Get()
  async getPosts(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('size', ParseIntPipe) size: number = 10,
  ) {
    const cachedPosts = await this.getCachedPosts(page, size);

    if (cachedPosts) {
      return cachedPosts;
    }

    const posts = await this.postsRepository.find({
      skip: (page - 1) * size,
      take: size,
    });

    await this.saveCachePosts(page, size, posts);

    return posts;
  }

  private async getCachedPosts(page: number, size: number) {
    const key = `posts:${page}:${size}`;
    const postIds = await this.cache.get<string[]>(key);
    Logger.log(`Getting cached posts ${postIds?.toString()}`);

    if (!postIds) {
      Logger.log(`No cached posts found.`);
      return null;
    }

    const cached = await this.cache.mget<PostEntity>(postIds);
    const cacheMissItems = cached.filter((i) => i === null);

    // No cached items found
    if (0 === cacheMissItems.length) {
      Logger.log(`Full cached hit.`);
      return cached as PostEntity[];
    }

    // Find latest cache from missed
    const diff = postIds.filter((postId) => {
      return !cached.some((i) => i?.id === postId);
    });

    Logger.log(`Partial cached hit. Find latest cache from missed: ${diff.toString()}`);

    const missedItems = await this.postsRepository.find({
      where: {
        id: In(diff),
      },
    });

    const merged = merge(cached, missedItems);

    await this.saveCachePosts(page, size, merged);

    return merged as PostEntity[];
  }

  private async saveCachePosts(
    page: number,
    size: number,
    posts: PostEntity[],
  ) {
    Logger.log(`Save cache posts ${page}`);
    const key = `posts:${page}:${size}`;
    const postIds = posts.map((i) => i.id);

    await Promise.all([
      this.cache.set(key, postIds, 10000),
      this.cache.mset(
        posts.map((post) => {
          return {
            key: `post:${post.id}`,
            value: post,
            ttl: 10000
          };
        }),
      ),
    ]);
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
