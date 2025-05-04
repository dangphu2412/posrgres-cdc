import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateToteInput } from './dto/create-tote.input';
import { UpdateToteInput } from './dto/update-tote.input';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ToteEntity } from './entities/tote.entity';

@Injectable()
export class TotesService {
  private static CACHE_PREFIX = 'totes:';
  private static TTL = 10000;

  constructor(
    @InjectRepository(ToteEntity)
    private toteEntityRepository: Repository<ToteEntity>,
    @Inject(CACHE_MANAGER)
    private cache: Cache,
  ) {}

  async create(createToteInput: CreateToteInput) {
    const { identifiers } =
      await this.toteEntityRepository.insert(createToteInput);
    return identifiers[0].id as string;
  }

  async findAll(page: number, size: number) {
    const cachedTotes = await this.getCached(page, size);

    if (cachedTotes) {
      return cachedTotes;
    }

    const posts = await this.toteEntityRepository.find({
      skip: (page - 1) * size,
      take: size,
    });

    await this.saveCache(page, size, posts);

    return posts;
  }

  private async getCached(page: number, size: number) {
    const key = `posts:${page}:${size}`;
    const postIdKeys = await this.cache.get<string[]>(key);
    Logger.log(`Getting cached totes ${postIdKeys?.toString()}`);

    if (!postIdKeys) {
      Logger.log(`No cached posts found.`);
      return null;
    }

    const cached = await this.cache.mget<ToteEntity>(postIdKeys);
    const cacheMissItems = cached.filter((i) => i === null);

    // No cached items found
    if (0 === cacheMissItems.length) {
      Logger.log(`Full cached hit.`);
      return cached as ToteEntity[];
    }

    // Find latest cache from missed
    const diff = postIdKeys
      .filter((postId) => {
        return !cached.some(
          (i) => `${TotesService.CACHE_PREFIX}${i?.id}` === postId,
        );
      })
      .map((i) => i.slice('${TotesService.CACHE_PREFIX}'.length));

    Logger.log(
      `Partial cached hit. Find latest cache from missed: ${diff.toString()}`,
    );

    const missedItems = await this.toteEntityRepository.find({
      where: {
        id: In(diff),
      },
    });

    const merged = cached.filter((i) => i !== null).concat(missedItems);

    await this.saveCache(page, size, merged);

    return merged;
  }

  private async saveCache(page: number, size: number, posts: ToteEntity[]) {
    Logger.log(`Save cache posts ${page}`);
    const key = `posts:${page}:${size}`;
    const postIdKeys = posts.map((i) => `${TotesService.CACHE_PREFIX}${i.id}`);

    await Promise.all([
      this.cache.set(key, postIdKeys, TotesService.TTL),
      this.cache.mset(
        posts.map((post) => {
          return {
            key: `${TotesService.CACHE_PREFIX}${post.id}`,
            value: post,
            ttl: TotesService.TTL,
          };
        }),
      ),
    ]);
  }

  findOne(id: string) {
    return this.toteEntityRepository.findOneBy({ id });
  }

  update(id: string, updateToteInput: UpdateToteInput) {
    return this.toteEntityRepository.update({ id }, updateToteInput);
  }

  remove(id: number) {
    return `This action removes a #${id} tote`;
  }
}
