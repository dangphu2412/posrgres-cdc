import { Command, CommandRunner } from 'nest-commander';
import { Repository } from 'typeorm';
import { Color, ToteEntity } from './entities/tote.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Command({ name: 'seed', description: 'A parameter parse' })
export class TotesDummyCommand extends CommandRunner {
  constructor(
    @InjectRepository(ToteEntity)
    private readonly totesRepository: Repository<ToteEntity>,
  ) {
    super();
  }

  async run(
    _passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    await this.totesRepository.insert([
      {
        name: 'Monocle Canvas Tote Bag',
        price: 213.99,
        rating: 4.9,
        color: Color.BLUE,
        material: 'canvas',
        size: 'large',
        isNewArrival: true,
        isBestSeller: true,
        inStock: true,
        style: ['everyday', 'work'],
        bannerURL:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Best%20Media%20Tote%20Bags,%20Ranked.jpg-z2O2nGPSTrjey8xEM1cc5aTI2ggjXE.jpeg',
      },
      {
        name: 'Square One District Tote',
        price: 189.99,
        rating: 4.9,
        color: Color.BLACK,
        material: 'canvas',
        size: 'medium',
        isNewArrival: false,
        isBestSeller: true,
        inStock: true,
        style: ['minimalist', 'work'],
        bannerURL:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Index,%20Vanderbrand.jpg-Fv7HHkBaQgZe7HG3hbz5aojPoFRIuo.jpeg',
      },
      {
        name: 'Sporty & Rich Canvas Tote',
        price: 221.99,
        rating: 4.9,
        color: Color.BLACK,
        material: 'canvas',
        size: 'large',
        isNewArrival: true,
        isBestSeller: false,
        inStock: true,
        style: ['everyday', 'travel'],
        bannerURL:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(2).jpg-zbeT25jMphcVf4DmpAlTVsGALg88Zn.jpeg',
      },
      {
        name: 'Eco-Friendly Jute Tote',
        price: 49.99,
        rating: 4.7,
        color: Color.BLACK,
        material: 'jute',
        size: 'medium',
        isNewArrival: false,
        isBestSeller: false,
        inStock: true,
        style: ['eco-friendly', 'everyday'],
        bannerURL: '/placeholder.svg?height=400&width=400',
      },
      {
        name: 'Premium Leather Tote',
        price: 299.99,
        rating: 4.8,
        color: Color.BLUE,
        material: 'leather',
        size: 'large',
        isNewArrival: false,
        isBestSeller: true,
        inStock: true,
        style: ['work', 'minimalist'],
        bannerURL: '/placeholder.svg?height=400&width=400',
      },
    ]);
  }
}
