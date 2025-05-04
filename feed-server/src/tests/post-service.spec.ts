import { PostController, PostEntity } from '../post-service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { In, Repository } from 'typeorm';

describe(PostController.name, () => {
  let postController: PostController;
  let postRepository: Repository<PostEntity>;
  let cache: Cache;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: getRepositoryToken(PostEntity),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            mget: jest.fn(),
            set: jest.fn(),
            mset: jest.fn(),
          },
        },
      ],
    }).compile();

    postController = moduleRef.get(PostController);
    postRepository = moduleRef.get(getRepositoryToken(PostEntity));
    cache = moduleRef.get(CACHE_MANAGER);
  });

  describe('getPosts', () => {
    it('should fetch posts from DAL and store to cache', async () => {
      const sampleDate = new Date();
      const response = [
        {
          id: '1',
          title: 'title1',
          content: '',
          createdAt: sampleDate,
          updatedAt: sampleDate,
        },
        {
          id: '2',
          title: 'title2',
          content: '',
          createdAt: sampleDate,
          updatedAt: sampleDate,
        },
      ];
      jest.spyOn(cache, 'get').mockResolvedValue(null);
      jest.spyOn(postRepository, 'find').mockResolvedValue(response);

      expect(await postController.getPosts(1, 10)).toEqual(response);
      expect(postRepository.find).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
      expect(cache.set).toHaveBeenCalledWith(
        'posts:1:10',
        ['post:1', 'post:2'],
        10000,
      );
      expect(cache.mset).toHaveBeenCalledWith([
        {
          key: 'post:1',
          value: {
            id: '1',
            title: 'title1',
            content: '',
            createdAt: sampleDate,
            updatedAt: sampleDate,
          },
          ttl: 10000,
        },
        {
          key: 'post:2',
          value: {
            id: '2',
            title: 'title2',
            content: '',
            createdAt: sampleDate,
            updatedAt: sampleDate,
          },
          ttl: 10000,
        },
      ]);
    });

    it('should hit full cached posts from cache store', async () => {
      const sampleDate = new Date();
      const response = [
        {
          id: '1',
          title: 'title1',
          content: '',
          createdAt: sampleDate,
          updatedAt: sampleDate,
        },
        {
          id: '2',
          title: 'title2',
          content: '',
          createdAt: sampleDate,
          updatedAt: sampleDate,
        },
      ];
      jest.spyOn(cache, 'get').mockResolvedValue(['post:1', 'post:2']);
      jest.spyOn(cache, 'mget').mockResolvedValue([
        {
          id: '1',
          title: 'title1',
          content: '',
          createdAt: sampleDate,
          updatedAt: sampleDate,
        },
        {
          id: '2',
          title: 'title2',
          content: '',
          createdAt: sampleDate,
          updatedAt: sampleDate,
        },
      ]);

      expect(await postController.getPosts(1, 10)).toEqual(response);
      expect(cache.get).toHaveBeenCalledWith('posts:1:10');
      expect(cache.mget).toHaveBeenCalledWith(['post:1', 'post:2']);
    });

    it('should hit partially cached posts from cache store and then merge the patches from DAL', async () => {
      const sampleDate = new Date();
      const response = [
        {
          id: '1',
          title: 'title1',
          content: '',
          createdAt: sampleDate,
          updatedAt: sampleDate,
        },
        {
          id: '2',
          title: 'title2',
          content: '',
          createdAt: sampleDate,
          updatedAt: sampleDate,
        },
      ];
      jest.spyOn(cache, 'get').mockResolvedValue(['post:1', 'post:2']);
      // Get details only hit first post
      jest.spyOn(cache, 'mget').mockResolvedValue([
        {
          id: '1',
          title: 'title1',
          content: '',
          createdAt: sampleDate,
          updatedAt: sampleDate,
        },
        null,
      ]);
      // Call database to get missing cached
      jest.spyOn(postRepository, 'find').mockResolvedValue([
        {
          id: '2',
          title: 'title2',
          content: '',
          createdAt: sampleDate,
          updatedAt: sampleDate,
        },
      ]);

      expect(await postController.getPosts(1, 10)).toEqual(response);

      expect(postRepository.find).toHaveBeenCalledWith({
        where: {
          id: In(['2']),
        },
      });

      expect(cache.get).toHaveBeenCalledWith('posts:1:10');
      expect(cache.mget).toHaveBeenCalledWith(['post:1', 'post:2']);
      expect(cache.set).toHaveBeenCalledWith(
        'posts:1:10',
        ['post:1', 'post:2'],
        10000,
      );
      expect(cache.mset).toHaveBeenCalledWith([
        {
          key: 'post:1',
          value: {
            id: '1',
            title: 'title1',
            content: '',
            createdAt: sampleDate,
            updatedAt: sampleDate,
          },
          ttl: 10000,
        },
        {
          key: 'post:2',
          value: {
            id: '2',
            title: 'title2',
            content: '',
            createdAt: sampleDate,
            updatedAt: sampleDate,
          },
          ttl: 10000,
        },
      ]);
    });
  });
});
