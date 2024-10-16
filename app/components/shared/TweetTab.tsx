import { redirect } from "next/navigation";
import { fetchUserPosts } from "@/app/lib/actions/user.action";
import TweetCard from "../cards/TweetCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const TweetTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result = await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className="flex mt-9 flex-col gap-10">
      {result.tweets.map((tweet: any) => (
        <TweetCard
          key={tweet._id}
          id={tweet._id}
          currentUserId={currentUserId}
          parentId={tweet.parentId}
          content={tweet.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: tweet.author.name,
                  image: tweet.author.image,
                  id: tweet.author.id,
                }
          }
          community={tweet.community} // TODO
          createdAt={tweet.createdAt}
          comments={tweet.children}
        />
      ))}
    </section>
  );
};

export default TweetTab;
