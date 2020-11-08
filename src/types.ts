import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createUserLoader } from "./utils/createUserLoader";
import { createupvoteLoader } from "./utils/createUpvoteLoader";
import { Stream } from "stream";

export type MyContext = {
  req: Request & { session: Express.Session };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  upvoteLoader: ReturnType<typeof createupvoteLoader>;
};

export type Upload = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
};
