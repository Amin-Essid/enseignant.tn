import { Upvote } from "../entities/UpVote";
import DataLoader from "dataloader";

// [{postId: 5, userId: 10}]
// [{postId: 5, userId: 10, value: 1}]
export const createupvoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Upvote | null>(
    async (keys) => {
      const upvotes = await Upvote.findByIds(keys as any);
      const upvoteIdsToUpdoot: Record<string, Upvote> = {};
      console.log(upvotes);
      upvotes.forEach((upvote) => {
        upvoteIdsToUpdoot[`${upvote.userId}|${upvote.postId}`] = upvote;
      });

      return keys.map(
        (key) => upvoteIdsToUpdoot[`${key.userId}|${key.postId}`]
      );
    }
  );
