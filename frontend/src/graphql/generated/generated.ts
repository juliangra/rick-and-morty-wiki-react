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
  Upload: any
}

export type AuthenticationResponse = {
  __typename?: 'AuthenticationResponse'
  error?: Maybe<Scalars['String']>
  token?: Maybe<Scalars['String']>
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Character = {
  __typename?: 'Character'
  /** Time at which the character was created in the database. */
  created?: Maybe<Scalars['String']>
  /** Episodes in which this character appeared. */
  episode: Array<Maybe<Episode>>
  /** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
  gender?: Maybe<Scalars['String']>
  /** The id of the character. */
  id?: Maybe<Scalars['ID']>
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image?: Maybe<Scalars['String']>
  /** The character's last known location */
  location?: Maybe<Location>
  /** The name of the character. */
  name?: Maybe<Scalars['String']>
  /** The character's origin location */
  origin?: Maybe<Location>
  /** The species of the character. */
  species?: Maybe<Scalars['String']>
  /** The status of the character ('Alive', 'Dead' or 'unknown'). */
  status?: Maybe<Scalars['String']>
  /** The type or subspecies of the character. */
  type?: Maybe<Scalars['String']>
}

export type Characters = {
  __typename?: 'Characters'
  info?: Maybe<Info>
  results?: Maybe<Array<Maybe<Character>>>
}

export type Episode = {
  __typename?: 'Episode'
  /** The air date of the episode. */
  air_date?: Maybe<Scalars['String']>
  /** List of characters who have been seen in the episode. */
  characters: Array<Maybe<Character>>
  /** Time at which the episode was created in the database. */
  created?: Maybe<Scalars['String']>
  /** The code of the episode. */
  episode?: Maybe<Scalars['String']>
  /** The id of the episode. */
  id?: Maybe<Scalars['ID']>
  /** The name of the episode. */
  name?: Maybe<Scalars['String']>
}

export type Episodes = {
  __typename?: 'Episodes'
  info?: Maybe<Info>
  results?: Maybe<Array<Maybe<Episode>>>
}

export type FilterCharacter = {
  gender?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  species?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type FilterEpisode = {
  episode?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type FilterLocation = {
  dimension?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type Info = {
  __typename?: 'Info'
  /** The length of the response. */
  count?: Maybe<Scalars['Int']>
  /** Number of the next page (if it exists) */
  next?: Maybe<Scalars['Int']>
  /** The amount of pages. */
  pages?: Maybe<Scalars['Int']>
  /** Number of the previous page (if it exists) */
  prev?: Maybe<Scalars['Int']>
}

export type Location = {
  __typename?: 'Location'
  /** Time at which the location was created in the database. */
  created?: Maybe<Scalars['String']>
  /** The dimension in which the location is located. */
  dimension?: Maybe<Scalars['String']>
  /** The id of the location. */
  id?: Maybe<Scalars['ID']>
  /** The name of the location. */
  name?: Maybe<Scalars['String']>
  /** List of characters who have been last seen in the location. */
  residents: Array<Maybe<Character>>
  /** The type of the location. */
  type?: Maybe<Scalars['String']>
}

export type Locations = {
  __typename?: 'Locations'
  info?: Maybe<Info>
  results?: Maybe<Array<Maybe<Location>>>
}

export type Mutation = {
  __typename?: 'Mutation'
  authenticateUser: AuthenticationResponse
  createUser: AuthenticationResponse
  deleteRating: Rating
  /** Create a rating for a given character by a given user. */
  rateCharacter: Rating
}

export type MutationAuthenticateUserArgs = {
  identifier: Scalars['String']
  password: Scalars['String']
}

export type MutationCreateUserArgs = {
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type MutationDeleteRatingArgs = {
  characterId: Scalars['ID']
  userId: Scalars['ID']
}

export type MutationRateCharacterArgs = {
  characterId: Scalars['ID']
  userId: Scalars['ID']
  value: RatingValue
}

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query'
  /** Get a specific character by ID */
  character?: Maybe<Character>
  /** Get the list of all characters */
  characters?: Maybe<Characters>
  /** Get a list of characters selected by ids */
  charactersByIds?: Maybe<Array<Maybe<Character>>>
  /** Get a specific episode by ID */
  episode?: Maybe<Episode>
  /** Get the list of all episodes */
  episodes?: Maybe<Episodes>
  /** Get a list of episodes selected by ids */
  episodesByIds?: Maybe<Array<Maybe<Episode>>>
  /** Check if a user has rated a given character. */
  hasRatedCharacter: Scalars['Boolean']
  /** Get a specific locations by ID */
  location?: Maybe<Location>
  /** Get the list of all locations */
  locations?: Maybe<Locations>
  /** Get a list of locations selected by ids */
  locationsByIds?: Maybe<Array<Maybe<Location>>>
  /** Fetch a given rating by the compund ID of userId and characterId. */
  rating?: Maybe<Rating>
  /** Fetch all ratings for a given character. */
  ratingStatsByCharacterId: RatingStats
  /** Fetch all ratings in a given order. */
  ratings: Array<Rating>
  user?: Maybe<User>
  /** Fetch all users. */
  users: Array<User>
}

export type QueryCharacterArgs = {
  id: Scalars['ID']
}

export type QueryCharactersArgs = {
  filter?: InputMaybe<FilterCharacter>
  page?: InputMaybe<Scalars['Int']>
}

export type QueryCharactersByIdsArgs = {
  ids: Array<Scalars['ID']>
}

export type QueryEpisodeArgs = {
  id: Scalars['ID']
}

export type QueryEpisodesArgs = {
  filter?: InputMaybe<FilterEpisode>
  page?: InputMaybe<Scalars['Int']>
}

export type QueryEpisodesByIdsArgs = {
  ids: Array<Scalars['ID']>
}

export type QueryHasRatedCharacterArgs = {
  characterId: Scalars['ID']
  userId: Scalars['ID']
}

export type QueryLocationArgs = {
  id: Scalars['ID']
}

export type QueryLocationsArgs = {
  filter?: InputMaybe<FilterLocation>
  page?: InputMaybe<Scalars['Int']>
}

export type QueryLocationsByIdsArgs = {
  ids: Array<Scalars['ID']>
}

export type QueryRatingArgs = {
  characterId: Scalars['ID']
  userId: Scalars['ID']
}

export type QueryRatingStatsByCharacterIdArgs = {
  characterId: Scalars['ID']
  order: Order
}

export type QueryRatingsArgs = {
  order: Order
}

export type QueryUserArgs = {
  username: Scalars['String']
}

/**
 * A rating of a character by a user.
 * It does not have its own ID, but rather a compund ID of userId and characterId, because it is a link table.
 */
export type Rating = {
  __typename?: 'Rating'
  characterId: Scalars['ID']
  userId: Scalars['ID']
  value: Scalars['Int']
}

export type RatingStats = {
  __typename?: 'RatingStats'
  average: Scalars['Float']
  count: Scalars['Int']
}

/** A rating can be a value between 1 and 5. */
export enum RatingValue {
  Five = 'FIVE',
  Four = 'FOUR',
  One = 'ONE',
  Three = 'THREE',
  Two = 'TWO'
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['String']
  email: Scalars['String']
  id: Scalars['ID']
  /** A list of ratings given by this user. */
  ratings?: Maybe<Array<Rating>>
  username: Scalars['String']
}

export type DefaultCharacterFragment = {
  __typename?: 'Character'
  id?: string | null
  name?: string | null
  gender?: string | null
  image?: string | null
  species?: string | null
  status?: string | null
  location?: {
    __typename?: 'Location'
    id?: string | null
    name?: string | null
    dimension?: string | null
    type?: string | null
  } | null
}

export type DefaultRatingFragment = {
  __typename?: 'Rating'
  userId: string
  characterId: string
  value: number
}

export type DeleteRatingMutationVariables = Exact<{
  characterId: Scalars['ID']
  userId: Scalars['ID']
}>

export type DeleteRatingMutation = {
  __typename?: 'Mutation'
  deleteRating: { __typename?: 'Rating'; userId: string; characterId: string; value: number }
}

export type RateCharacterMutationVariables = Exact<{
  userId: Scalars['ID']
  characterId: Scalars['ID']
  value: RatingValue
}>

export type RateCharacterMutation = {
  __typename?: 'Mutation'
  rateCharacter: { __typename?: 'Rating'; userId: string; characterId: string; value: number }
}

export type AuthenticateUserMutationVariables = Exact<{
  identifier: Scalars['String']
  password: Scalars['String']
}>

export type AuthenticateUserMutation = {
  __typename?: 'Mutation'
  authenticateUser: {
    __typename?: 'AuthenticationResponse'
    token?: string | null
    error?: string | null
  }
}

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: {
    __typename?: 'AuthenticationResponse'
    token?: string | null
    error?: string | null
  }
}

export type GetCharacterByIdQueryVariables = Exact<{
  characterId: Scalars['ID']
}>

export type GetCharacterByIdQuery = {
  __typename?: 'Query'
  character?: {
    __typename?: 'Character'
    id?: string | null
    name?: string | null
    gender?: string | null
    image?: string | null
    species?: string | null
    status?: string | null
    location?: {
      __typename?: 'Location'
      id?: string | null
      name?: string | null
      dimension?: string | null
      type?: string | null
    } | null
  } | null
}

export type GetCharactersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>
  filter?: InputMaybe<FilterCharacter>
}>

export type GetCharactersQuery = {
  __typename?: 'Query'
  characters?: {
    __typename?: 'Characters'
    info?: { __typename?: 'Info'; pages?: number | null; count?: number | null } | null
    results?: Array<{
      __typename?: 'Character'
      id?: string | null
      name?: string | null
      gender?: string | null
      image?: string | null
      species?: string | null
      status?: string | null
      location?: {
        __typename?: 'Location'
        id?: string | null
        name?: string | null
        dimension?: string | null
        type?: string | null
      } | null
    } | null> | null
  } | null
}

export type GetRatingQueryVariables = Exact<{
  userId: Scalars['ID']
  characterId: Scalars['ID']
}>

export type GetRatingQuery = {
  __typename?: 'Query'
  rating?: { __typename?: 'Rating'; userId: string; characterId: string; value: number } | null
}

export type GetRatingStatsByCharacterIdQueryVariables = Exact<{
  characterId: Scalars['ID']
  order: Order
}>

export type GetRatingStatsByCharacterIdQuery = {
  __typename?: 'Query'
  ratingStatsByCharacterId: { __typename?: 'RatingStats'; average: number; count: number }
}

export type GetRatingsQueryVariables = Exact<{
  order: Order
}>

export type GetRatingsQuery = {
  __typename?: 'Query'
  ratings: Array<{ __typename?: 'Rating'; userId: string; characterId: string; value: number }>
}

export type HasRatedCharacterQueryVariables = Exact<{
  characterId: Scalars['ID']
  userId: Scalars['ID']
}>

export type HasRatedCharacterQuery = { __typename?: 'Query'; hasRatedCharacter: boolean }

export const DefaultCharacterFragmentDoc = gql`
  fragment DefaultCharacter on Character {
    id
    name
    gender
    image
    species
    status
    location {
      id
      name
      dimension
      type
    }
  }
`
export const DefaultRatingFragmentDoc = gql`
  fragment DefaultRating on Rating {
    userId
    characterId
    value
  }
`
export const DeleteRatingDocument = gql`
  mutation DeleteRating($characterId: ID!, $userId: ID!) {
    deleteRating(characterId: $characterId, userId: $userId) {
      ...DefaultRating
    }
  }
  ${DefaultRatingFragmentDoc}
`
export type DeleteRatingMutationFn = Apollo.MutationFunction<
  DeleteRatingMutation,
  DeleteRatingMutationVariables
>

/**
 * __useDeleteRatingMutation__
 *
 * To run a mutation, you first call `useDeleteRatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRatingMutation, { data, loading, error }] = useDeleteRatingMutation({
 *   variables: {
 *      characterId: // value for 'characterId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteRatingMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteRatingMutation, DeleteRatingMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteRatingMutation, DeleteRatingMutationVariables>(
    DeleteRatingDocument,
    options
  )
}
export type DeleteRatingMutationHookResult = ReturnType<typeof useDeleteRatingMutation>
export type DeleteRatingMutationResult = Apollo.MutationResult<DeleteRatingMutation>
export type DeleteRatingMutationOptions = Apollo.BaseMutationOptions<
  DeleteRatingMutation,
  DeleteRatingMutationVariables
>
export const RateCharacterDocument = gql`
  mutation RateCharacter($userId: ID!, $characterId: ID!, $value: RatingValue!) {
    rateCharacter(userId: $userId, characterId: $characterId, value: $value) {
      ...DefaultRating
    }
  }
  ${DefaultRatingFragmentDoc}
`
export type RateCharacterMutationFn = Apollo.MutationFunction<
  RateCharacterMutation,
  RateCharacterMutationVariables
>

/**
 * __useRateCharacterMutation__
 *
 * To run a mutation, you first call `useRateCharacterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateCharacterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateCharacterMutation, { data, loading, error }] = useRateCharacterMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      characterId: // value for 'characterId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useRateCharacterMutation(
  baseOptions?: Apollo.MutationHookOptions<RateCharacterMutation, RateCharacterMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RateCharacterMutation, RateCharacterMutationVariables>(
    RateCharacterDocument,
    options
  )
}
export type RateCharacterMutationHookResult = ReturnType<typeof useRateCharacterMutation>
export type RateCharacterMutationResult = Apollo.MutationResult<RateCharacterMutation>
export type RateCharacterMutationOptions = Apollo.BaseMutationOptions<
  RateCharacterMutation,
  RateCharacterMutationVariables
>
export const AuthenticateUserDocument = gql`
  mutation AuthenticateUser($identifier: String!, $password: String!) {
    authenticateUser(identifier: $identifier, password: $password) {
      token
      error
    }
  }
`
export type AuthenticateUserMutationFn = Apollo.MutationFunction<
  AuthenticateUserMutation,
  AuthenticateUserMutationVariables
>

/**
 * __useAuthenticateUserMutation__
 *
 * To run a mutation, you first call `useAuthenticateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateUserMutation, { data, loading, error }] = useAuthenticateUserMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthenticateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthenticateUserMutation,
    AuthenticateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AuthenticateUserMutation, AuthenticateUserMutationVariables>(
    AuthenticateUserDocument,
    options
  )
}
export type AuthenticateUserMutationHookResult = ReturnType<typeof useAuthenticateUserMutation>
export type AuthenticateUserMutationResult = Apollo.MutationResult<AuthenticateUserMutation>
export type AuthenticateUserMutationOptions = Apollo.BaseMutationOptions<
  AuthenticateUserMutation,
  AuthenticateUserMutationVariables
>
export const CreateUserDocument = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      error
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  )
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>
export const GetCharacterByIdDocument = gql`
  query GetCharacterById($characterId: ID!) {
    character(id: $characterId) {
      ...DefaultCharacter
    }
  }
  ${DefaultCharacterFragmentDoc}
`

/**
 * __useGetCharacterByIdQuery__
 *
 * To run a query within a React component, call `useGetCharacterByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharacterByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharacterByIdQuery({
 *   variables: {
 *      characterId: // value for 'characterId'
 *   },
 * });
 */
export function useGetCharacterByIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetCharacterByIdQuery, GetCharacterByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCharacterByIdQuery, GetCharacterByIdQueryVariables>(
    GetCharacterByIdDocument,
    options
  )
}
export function useGetCharacterByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCharacterByIdQuery, GetCharacterByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCharacterByIdQuery, GetCharacterByIdQueryVariables>(
    GetCharacterByIdDocument,
    options
  )
}
export type GetCharacterByIdQueryHookResult = ReturnType<typeof useGetCharacterByIdQuery>
export type GetCharacterByIdLazyQueryHookResult = ReturnType<typeof useGetCharacterByIdLazyQuery>
export type GetCharacterByIdQueryResult = Apollo.QueryResult<
  GetCharacterByIdQuery,
  GetCharacterByIdQueryVariables
>
export const GetCharactersDocument = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
        count
      }
      results {
        ...DefaultCharacter
      }
    }
  }
  ${DefaultCharacterFragmentDoc}
`

/**
 * __useGetCharactersQuery__
 *
 * To run a query within a React component, call `useGetCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharactersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetCharactersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCharactersQuery, GetCharactersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
    GetCharactersDocument,
    options
  )
}
export function useGetCharactersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCharactersQuery, GetCharactersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCharactersQuery, GetCharactersQueryVariables>(
    GetCharactersDocument,
    options
  )
}
export type GetCharactersQueryHookResult = ReturnType<typeof useGetCharactersQuery>
export type GetCharactersLazyQueryHookResult = ReturnType<typeof useGetCharactersLazyQuery>
export type GetCharactersQueryResult = Apollo.QueryResult<
  GetCharactersQuery,
  GetCharactersQueryVariables
>
export const GetRatingDocument = gql`
  query GetRating($userId: ID!, $characterId: ID!) {
    rating(userId: $userId, characterId: $characterId) {
      ...DefaultRating
    }
  }
  ${DefaultRatingFragmentDoc}
`

/**
 * __useGetRatingQuery__
 *
 * To run a query within a React component, call `useGetRatingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      characterId: // value for 'characterId'
 *   },
 * });
 */
export function useGetRatingQuery(
  baseOptions: Apollo.QueryHookOptions<GetRatingQuery, GetRatingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRatingQuery, GetRatingQueryVariables>(GetRatingDocument, options)
}
export function useGetRatingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRatingQuery, GetRatingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRatingQuery, GetRatingQueryVariables>(GetRatingDocument, options)
}
export type GetRatingQueryHookResult = ReturnType<typeof useGetRatingQuery>
export type GetRatingLazyQueryHookResult = ReturnType<typeof useGetRatingLazyQuery>
export type GetRatingQueryResult = Apollo.QueryResult<GetRatingQuery, GetRatingQueryVariables>
export const GetRatingStatsByCharacterIdDocument = gql`
  query GetRatingStatsByCharacterId($characterId: ID!, $order: Order!) {
    ratingStatsByCharacterId(characterId: $characterId, order: $order) {
      average
      count
    }
  }
`

/**
 * __useGetRatingStatsByCharacterIdQuery__
 *
 * To run a query within a React component, call `useGetRatingStatsByCharacterIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingStatsByCharacterIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingStatsByCharacterIdQuery({
 *   variables: {
 *      characterId: // value for 'characterId'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useGetRatingStatsByCharacterIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRatingStatsByCharacterIdQuery,
    GetRatingStatsByCharacterIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetRatingStatsByCharacterIdQuery,
    GetRatingStatsByCharacterIdQueryVariables
  >(GetRatingStatsByCharacterIdDocument, options)
}
export function useGetRatingStatsByCharacterIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRatingStatsByCharacterIdQuery,
    GetRatingStatsByCharacterIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetRatingStatsByCharacterIdQuery,
    GetRatingStatsByCharacterIdQueryVariables
  >(GetRatingStatsByCharacterIdDocument, options)
}
export type GetRatingStatsByCharacterIdQueryHookResult = ReturnType<
  typeof useGetRatingStatsByCharacterIdQuery
>
export type GetRatingStatsByCharacterIdLazyQueryHookResult = ReturnType<
  typeof useGetRatingStatsByCharacterIdLazyQuery
>
export type GetRatingStatsByCharacterIdQueryResult = Apollo.QueryResult<
  GetRatingStatsByCharacterIdQuery,
  GetRatingStatsByCharacterIdQueryVariables
>
export const GetRatingsDocument = gql`
  query GetRatings($order: Order!) {
    ratings(order: $order) {
      ...DefaultRating
    }
  }
  ${DefaultRatingFragmentDoc}
`

/**
 * __useGetRatingsQuery__
 *
 * To run a query within a React component, call `useGetRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingsQuery({
 *   variables: {
 *      order: // value for 'order'
 *   },
 * });
 */
export function useGetRatingsQuery(
  baseOptions: Apollo.QueryHookOptions<GetRatingsQuery, GetRatingsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRatingsQuery, GetRatingsQueryVariables>(GetRatingsDocument, options)
}
export function useGetRatingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRatingsQuery, GetRatingsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRatingsQuery, GetRatingsQueryVariables>(GetRatingsDocument, options)
}
export type GetRatingsQueryHookResult = ReturnType<typeof useGetRatingsQuery>
export type GetRatingsLazyQueryHookResult = ReturnType<typeof useGetRatingsLazyQuery>
export type GetRatingsQueryResult = Apollo.QueryResult<GetRatingsQuery, GetRatingsQueryVariables>
export const HasRatedCharacterDocument = gql`
  query HasRatedCharacter($characterId: ID!, $userId: ID!) {
    hasRatedCharacter(characterId: $characterId, userId: $userId)
  }
`

/**
 * __useHasRatedCharacterQuery__
 *
 * To run a query within a React component, call `useHasRatedCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasRatedCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasRatedCharacterQuery({
 *   variables: {
 *      characterId: // value for 'characterId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useHasRatedCharacterQuery(
  baseOptions: Apollo.QueryHookOptions<HasRatedCharacterQuery, HasRatedCharacterQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<HasRatedCharacterQuery, HasRatedCharacterQueryVariables>(
    HasRatedCharacterDocument,
    options
  )
}
export function useHasRatedCharacterLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HasRatedCharacterQuery, HasRatedCharacterQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<HasRatedCharacterQuery, HasRatedCharacterQueryVariables>(
    HasRatedCharacterDocument,
    options
  )
}
export type HasRatedCharacterQueryHookResult = ReturnType<typeof useHasRatedCharacterQuery>
export type HasRatedCharacterLazyQueryHookResult = ReturnType<typeof useHasRatedCharacterLazyQuery>
export type HasRatedCharacterQueryResult = Apollo.QueryResult<
  HasRatedCharacterQuery,
  HasRatedCharacterQueryVariables
>
