import { currentUser } from "@clerk/nextjs/server";
import { fetchPosts } from "../components/lib/actions/tweet.actions";
import TweetCard from "../components/cards/TweetCard";

export default async function Home() {
  const result = await fetchPosts(1, 30);

  const user = await currentUser();

  return (
    <>
      <h1>Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result?.posts.length === 0 ? (
          <p>No Tweets found</p>
        ) : (
          <>
            {result?.posts.map((post) => {
              return (
                <TweetCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              );
            })}
          </>
        )}
      </section>
    </>
  );
}
