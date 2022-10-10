import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  _Any: any
}

export type Continent = {
  __typename?: 'Continent'
  code: Scalars['ID']
  countries: Array<Country>
  name: Scalars['String']
}

export type ContinentFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>
}

export type Country = {
  __typename?: 'Country'
  capital?: Maybe<Scalars['String']>
  code: Scalars['ID']
  continent: Continent
  currency?: Maybe<Scalars['String']>
  emoji: Scalars['String']
  emojiU: Scalars['String']
  languages: Array<Language>
  name: Scalars['String']
  native: Scalars['String']
  phone: Scalars['String']
  states: Array<State>
}

export type CountryFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>
  continent?: InputMaybe<StringQueryOperatorInput>
  currency?: InputMaybe<StringQueryOperatorInput>
}

export type Language = {
  __typename?: 'Language'
  code: Scalars['ID']
  name?: Maybe<Scalars['String']>
  native?: Maybe<Scalars['String']>
  rtl: Scalars['Boolean']
}

export type LanguageFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser: User
}

export type MutationCreateUserArgs = {
  email: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  _entities: Array<Maybe<_Entity>>
  _service: _Service
  continent?: Maybe<Continent>
  continents: Array<Continent>
  countries: Array<Country>
  country?: Maybe<Country>
  language?: Maybe<Language>
  languages: Array<Language>
  users: Array<User>
}

export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>
}

export type QueryContinentArgs = {
  code: Scalars['ID']
}

export type QueryContinentsArgs = {
  filter?: InputMaybe<ContinentFilterInput>
}

export type QueryCountriesArgs = {
  filter?: InputMaybe<CountryFilterInput>
}

export type QueryCountryArgs = {
  code: Scalars['ID']
}

export type QueryLanguageArgs = {
  code: Scalars['ID']
}

export type QueryLanguagesArgs = {
  filter?: InputMaybe<LanguageFilterInput>
}

export type State = {
  __typename?: 'State'
  code?: Maybe<Scalars['String']>
  country: Country
  name: Scalars['String']
}

export type StringQueryOperatorInput = {
  eq?: InputMaybe<Scalars['String']>
  glob?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  ne?: InputMaybe<Scalars['String']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  regex?: InputMaybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  id: Scalars['ID']
}

export type _Entity = Continent | Country | Language

export type _Service = {
  __typename?: '_Service'
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>
}

export type GetCountriesQueryVariables = Exact<{ [key: string]: never }>

export type GetCountriesQuery = {
  __typename?: 'Query'
  countries: Array<{
    __typename?: 'Country'
    code: string
    name: string
    continent: { __typename?: 'Continent'; code: string }
  }>
}

export const GetCountriesDocument = gql`
  query GetCountries {
    countries {
      code
      name
      continent {
        code
      }
    }
  }
`

/**
 * __useGetCountriesQuery__
 *
 * To run a query within a React component, call `useGetCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCountriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCountriesQuery, GetCountriesQueryVariables>(
    GetCountriesDocument,
    options
  )
}
export function useGetCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCountriesQuery, GetCountriesQueryVariables>(
    GetCountriesDocument,
    options
  )
}
export type GetCountriesQueryHookResult = ReturnType<typeof useGetCountriesQuery>
export type GetCountriesLazyQueryHookResult = ReturnType<typeof useGetCountriesLazyQuery>
export type GetCountriesQueryResult = Apollo.QueryResult<
  GetCountriesQuery,
  GetCountriesQueryVariables
>
