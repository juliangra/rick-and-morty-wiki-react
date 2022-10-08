import gql from 'graphql-tag'

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Query {
    health: String
    users: [User!]!
  }

  type Mutation {
    createUser(email: String!): User!
  }
`

export default typeDefs
