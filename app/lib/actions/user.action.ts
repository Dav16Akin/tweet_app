"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Tweet from "../models/tweet.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    //find all tweets authored by user with given userId

    const tweets = await User.findOne({ id: userId }).populate({
      path: "tweets",
      model: Tweet,
      populate: {
        path: "children",
        model: Tweet,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return tweets;
  } catch (error: any) {
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<{ id: string; username?: string; name?: string }> =
      { id: { $ne: userId } };

    if (searchString?.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

export async function fetchActivity(userId: string) {
  try {
    connectToDB();

    //find all tweets created by user with given userId
    const userTweets = await Tweet.find({ author: userId });

    //Collect all the child tweet ids (replies) from the 'children' field
    const childTweetIds = userTweets.reduce((acc, userTweet) => {
      return acc.concat(userTweet.children);
    }, []);

    const replies = await Tweet.find({  
      _id: { $in: childTweetIds },
      author: { $ne: userId },
    }).populate({ path: "author", model: User, select: "name image _id" });

    return replies;

  } catch (error: any) {
    throw new Error(`Failed to fetch activities: ${error.message}`);
  }
}
