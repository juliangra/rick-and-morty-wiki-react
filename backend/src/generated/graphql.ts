import { GraphQLResolveInfo } from 'graphql'
import {
  User as UserModel,
  Character as CharacterModel,
  Rating as RatingModel
} from '.prisma/client'
import { Context } from '../context'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type AuthenticationResponse = {
  __typename?: 'AuthenticationResponse'
  error?: Maybe<Scalars['String']>
  token?: Maybe<Scalars['String']>
}

/**
 * A character from the third-party API (the Rick and Morty API).
 * We only care about the ID of the character in our own API, as we can use this
 * to fetch the character's details from the third-party API.
 */
export type Character = {
  __typename?: 'Character'
  id: Scalars['ID']
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
  /** Check if a user has rated a given character. */
  hasRatedCharacter: Scalars['Boolean']
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

export type QueryHasRatedCharacterArgs = {
  characterId: Scalars['ID']
  userId: Scalars['ID']
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

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthenticationResponse: ResolverTypeWrapper<AuthenticationResponse>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Character: ResolverTypeWrapper<CharacterModel>
  Float: ResolverTypeWrapper<Scalars['Float']>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Order: Order
  Query: ResolverTypeWrapper<{}>
  Rating: ResolverTypeWrapper<RatingModel>
  RatingStats: ResolverTypeWrapper<RatingStats>
  RatingValue: RatingValue
  String: ResolverTypeWrapper<Scalars['String']>
  User: ResolverTypeWrapper<UserModel>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthenticationResponse: AuthenticationResponse
  Boolean: Scalars['Boolean']
  Character: CharacterModel
  Float: Scalars['Float']
  ID: Scalars['ID']
  Int: Scalars['Int']
  Mutation: {}
  Query: {}
  Rating: RatingModel
  RatingStats: RatingStats
  String: Scalars['String']
  User: UserModel
}

export type AuthenticationResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthenticationResponse'] = ResolversParentTypes['AuthenticationResponse']
> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CharacterResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  authenticateUser?: Resolver<
    ResolversTypes['AuthenticationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationAuthenticateUserArgs, 'identifier' | 'password'>
  >
  createUser?: Resolver<
    ResolversTypes['AuthenticationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'username'>
  >
  deleteRating?: Resolver<
    ResolversTypes['Rating'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRatingArgs, 'characterId' | 'userId'>
  >
  rateCharacter?: Resolver<
    ResolversTypes['Rating'],
    ParentType,
    ContextType,
    RequireFields<MutationRateCharacterArgs, 'characterId' | 'userId' | 'value'>
  >
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  hasRatedCharacter?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<QueryHasRatedCharacterArgs, 'characterId' | 'userId'>
  >
  rating?: Resolver<
    Maybe<ResolversTypes['Rating']>,
    ParentType,
    ContextType,
    RequireFields<QueryRatingArgs, 'characterId' | 'userId'>
  >
  ratingStatsByCharacterId?: Resolver<
    ResolversTypes['RatingStats'],
    ParentType,
    ContextType,
    RequireFields<QueryRatingStatsByCharacterIdArgs, 'characterId' | 'order'>
  >
  ratings?: Resolver<
    Array<ResolversTypes['Rating']>,
    ParentType,
    ContextType,
    RequireFields<QueryRatingsArgs, 'order'>
  >
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'username'>
  >
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
}

export type RatingResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Rating'] = ResolversParentTypes['Rating']
> = {
  characterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type RatingStatsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RatingStats'] = ResolversParentTypes['RatingStats']
> = {
  average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  ratings?: Resolver<Maybe<Array<ResolversTypes['Rating']>>, ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = Context> = {
  AuthenticationResponse?: AuthenticationResponseResolvers<ContextType>
  Character?: CharacterResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Rating?: RatingResolvers<ContextType>
  RatingStats?: RatingStatsResolvers<ContextType>
  User?: UserResolvers<ContextType>
}
