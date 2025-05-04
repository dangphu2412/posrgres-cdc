/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
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
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateToteInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GetTotesListingQueryVariables = Exact<{
  page: Scalars['Float']['input'];
  size: Scalars['Float']['input'];
}>;


export type GetTotesListingQuery = { __typename?: 'Query', totes: Array<{ __typename?: 'Tote', id: string, name: string }> };



export const GetTotesListingDocument = gql`
    query GetTotesListing($page: Float!, $size: Float!) {
  totes(page: $page, size: $size) {
    id
    name
  }
}
    `;

/**
 * __useGetTotesListingQuery__
 *
 * To run a query within a React component, call `useGetTotesListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotesListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotesListingQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetTotesListingQuery(baseOptions: Apollo.QueryHookOptions<GetTotesListingQuery, GetTotesListingQueryVariables> & ({ variables: GetTotesListingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotesListingQuery, GetTotesListingQueryVariables>(GetTotesListingDocument, options);
      }
export function useGetTotesListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotesListingQuery, GetTotesListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotesListingQuery, GetTotesListingQueryVariables>(GetTotesListingDocument, options);
        }
export function useGetTotesListingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTotesListingQuery, GetTotesListingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotesListingQuery, GetTotesListingQueryVariables>(GetTotesListingDocument, options);
        }
export type GetTotesListingQueryHookResult = ReturnType<typeof useGetTotesListingQuery>;
export type GetTotesListingLazyQueryHookResult = ReturnType<typeof useGetTotesListingLazyQuery>;
export type GetTotesListingSuspenseQueryHookResult = ReturnType<typeof useGetTotesListingSuspenseQuery>;
export type GetTotesListingQueryResult = Apollo.QueryResult<GetTotesListingQuery, GetTotesListingQueryVariables>;