export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type CreateToteInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTote: Scalars['ID']['output'];
  removeTote: Tote;
  updateTote: Tote;
};


export type MutationCreateToteArgs = {
  createToteInput: CreateToteInput;
};


export type MutationRemoveToteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateToteArgs = {
  updateToteInput: UpdateToteInput;
};

export type Query = {
  __typename?: 'Query';
  tote: Tote;
  totes: Array<Tote>;
};


export type QueryToteArgs = {
  id: Scalars['String']['input'];
};


export type QueryTotesArgs = {
  page: Scalars['Float']['input'];
  size: Scalars['Float']['input'];
};

export type Tote = {
  __typename?: 'Tote';
  bannerURL: Scalars['String']['output'];
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inStock: Scalars['Boolean']['output'];
  isBestSeller: Scalars['Boolean']['output'];
  isNewArrival: Scalars['Boolean']['output'];
  material: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  rating: Scalars['Float']['output'];
  size: Scalars['String']['output'];
  style: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateToteInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SearchTotesDashboardQueryVariables = Exact<{
  page: Scalars['Float']['input'];
  size: Scalars['Float']['input'];
}>;


export type SearchTotesDashboardQuery = { __typename?: 'Query', totes: Array<{ __typename?: 'Tote', id: string, name: string, color: string, description?: string | null, bannerURL: string, price: number, rating: number, size: string, style: Array<string>, inStock: boolean, isBestSeller: boolean, isNewArrival: boolean, material: string }> };
