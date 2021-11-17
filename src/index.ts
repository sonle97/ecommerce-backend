import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import express from "express";
import session from "express-session";
import cors from "cors";
import connectRedis from "connect-redis";
import apiRoutes from "./api/index";

import { redis } from "./redis";
import config from "./config";
import createSchema from "./schema";

require("dotenv").config();

TypeORM.useContainer(Container);
const path = "/graphql";

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(apiRoutes);

async function main() {
  await TypeORM.createConnection();

  const schema = await createSchema(Container);

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const RedisStore = connectRedis(session);

  app.use(cors(config.cors));

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({ app, path, cors: config.cors });

  const port = config.port;

  app.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );
  });
}

main();
