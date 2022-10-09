import express from 'express'
import { config } from 'dotenv'
import { graphqlHTTP } from 'express-graphql'
import schema from './schemas'
import { context } from './context'

config()
const PORT = process.env.PORT

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    context,
    graphiql: true
  })
)

app.listen(PORT, () =>
  console.log(`🚀 Running a GraphQL API server at http://localhost:${PORT}/graphql`)
)

export { app }
