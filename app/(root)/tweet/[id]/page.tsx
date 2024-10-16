import TweetCard from "@/app/components/cards/TweetCard";
import Comment from "@/app/components/forms/Comment";
import { fetchTweetById } from "@/app/components/lib/actions/tweet.actions";
import { fetchUser } from "@/app/components/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  
  if (!userInfo?.onboarded) redirect("/onboarding");

  const tweet = await fetchTweetById(params.id);

  return (
    <section className="relative">
      <div>
        <TweetCard
          key={tweet._id}
          id={tweet._id}
          currentUserId={user?.id || ""}
          parentId={tweet.parentId}
          content={tweet.text}
          author={tweet.author}
          community={tweet.community}
          createdAt={tweet.createdAt}
          comments={tweet.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          tweetId={tweet.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {tweet.children.map((childItem: any) => {
          return (
            <TweetCard
              key={childItem._id}
              id={childItem._id}
              currentUserId={user?.id || ""}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
              community={childItem.community}
              createdAt={childItem.createdAt}
              comments={childItem.children}
              isComment
            />
          );
        })}
      </div>
    </section>
  );
};

export default page;
