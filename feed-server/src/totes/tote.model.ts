import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-scalars';

@ObjectType()
export class Tote {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLDateTime)
  createdAt: Date;

  @Field(() => GraphQLDateTime)
  updatedAt: Date;
}
