"use server";

import { revalidatePath } from "next/cache";
import Tweet from "../models/tweet.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  //calculate the number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;

  // Fetch Posts that have no Parents (top-level-tweets)
  const postQuery = Tweet.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostsCount = await Tweet.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createTweet({ text, author, communityId, path }: Params) {
  try {
    connectToDB();

    const createdTweet = await Tweet.create({
      text,
      author,
      community: null,
    });

    //Update User Model
    await User.findByIdAndUpdate(author, {
      $push: { tweets: createdTweet._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create Tweet : ${error.message}`);
  }
}

export async function fetchTweetById(id: string) {
  connectToDB();

  try {
    //TODO: populate community
    const tweet = await Tweet.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Tweet,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return tweet;
  } catch (error: any) {
    throw new Error(`Error fetching tweet: ${error.message}`);
  }
}

export async function addCommentToTweet(
  tweetId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    //adding a comment
    const originalTweet = await Tweet.findById(tweetId);

    if (!originalTweet) {
      throw new Error(`Tweet not found`);
    }
    const commentTweet = new Tweet({
      text: commentText,
      author: userId,
      parentId: tweetId,
    });

    const savedCommentTweet = await commentTweet.save();

    originalTweet.children.push(savedCommentTweet._id);

    await originalTweet.save();

    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Error adding comment to tweet: ${error.message}`);
  }
}


