import express from "express";
import { config } from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

config();
const PORT = process.env.PORT;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    // Query database and fetch user
    return "sebbi";
  },
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, () =>
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  )
);

export {};
