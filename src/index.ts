import "reflect-metadata";
import "dotenv-safe/config";
// npx typeorm migration:generate -n Initial
import { __prod__, COOKIE_NAME } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import path from "path";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { Upvote } from "./entities/UpVote";
import { createUserLoader } from "./utils/createUserLoader";
import { createupvoteLoader } from "./utils/createUpvoteLoader";
import { FileResolver } from "./resolvers/file";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Upvote],
  });
  await conn.runMigrations();

  // await Post.delete({});
  // await Like.delete({});

  const app = express();
  app.use("/files", express.static(path.join(__dirname, "../files")));

  const RedisStore = connectRedis(session);
  const redis = new Redis({
    port: 10260,
    host: process.env.REDIS_URL, // Redis host
    password: "1fBrzu1dM31n6ES8jr0ICkEdSh35CbYC",
  });
  // app.set("trust proxy", 1);
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        // sameSite: "none", // csrf
        secure: __prod__, // cookie only works in https
        // domain: __prod__ ? "share-education.vercel.app" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    // typeDefs,
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver, FileResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      upvoteLoader: createupvoteLoader(),
    }),
  });

  const corsOptions = { credentials: true, origin: "http://localhost:3000" };

  apolloServer.applyMiddleware({
    app,
    cors: corsOptions,
  });

  //use parseInt(process.env.PORT) in developement if needed
  app.listen(process.env.PORT, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
