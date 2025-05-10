import type * as Types from './models';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllTotesListingQueryVariables = Types.Exact<{
  page: Types.Scalars['Float']['input'];
  size: Types.Scalars['Float']['input'];
}>;


export type AllTotesListingQuery = { __typename?: 'Query', totes: Array<{ __typename?: 'Tote', id: string, name: string }> };


export const AllTotesListingDocument = gql`
    query AllTotesListing($page: Float!, $size: Float!) {
  totes(page: $page, size: $size) {
    id
    name
  }
}
    `;

/**
 * __useAllTotesListingQuery__
 *
 * To run a query within a React component, call `useAllTotesListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTotesListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTotesListingQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useAllTotesListingQuery(baseOptions: Apollo.QueryHookOptions<Types.AllTotesListingQuery, Types.AllTotesListingQueryVariables> & ({ variables: Types.AllTotesListingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AllTotesListingQuery, Types.AllTotesListingQueryVariables>(AllTotesListingDocument, options);
      }
export function useAllTotesListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AllTotesListingQuery, Types.AllTotesListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AllTotesListingQuery, Types.AllTotesListingQueryVariables>(AllTotesListingDocument, options);
        }
export function useAllTotesListingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.AllTotesListingQuery, Types.AllTotesListingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AllTotesListingQuery, Types.AllTotesListingQueryVariables>(AllTotesListingDocument, options);
        }
export type AllTotesListingQueryHookResult = ReturnType<typeof useAllTotesListingQuery>;
export type AllTotesListingLazyQueryHookResult = ReturnType<typeof useAllTotesListingLazyQuery>;
export type AllTotesListingSuspenseQueryHookResult = ReturnType<typeof useAllTotesListingSuspenseQuery>;
export type AllTotesListingQueryResult = Apollo.QueryResult<Types.AllTotesListingQuery, Types.AllTotesListingQueryVariables>;