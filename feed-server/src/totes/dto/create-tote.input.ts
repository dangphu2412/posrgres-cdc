import { Field, InputType } from '@nestjs/graphql';
import { Color } from '../entities/tote.entity';

@InputType()
export class CreateToteInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  price?: number;

  @Field()
  bannerURL: string;

  @Field()
  color: Color;

  @Field()
  material: string;

  @Field()
  size: string;

  @Field()
  rating: number;

  @Field(() => Boolean)
  isNewArrival: boolean;

  @Field(() => Boolean)
  isBestSeller: boolean;

  @Field()
  inStock: boolean;

  @Field(() => [String])
  style: string[];
}
