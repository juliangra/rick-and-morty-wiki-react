/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

const documents = {
  'query GetCountries {\n  countries {\n    code\n    name\n    continent {\n      code\n    }\n  }\n}':
    types.GetCountriesDocument
}

export function graphql(
  source: 'query GetCountries {\n  countries {\n    code\n    name\n    continent {\n      code\n    }\n  }\n}'
): typeof documents['query GetCountries {\n  countries {\n    code\n    name\n    continent {\n      code\n    }\n  }\n}']

export function graphql(source: string): unknown
export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
