import {
  fetchActivity,
  fetchUser,
} from "@/app/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  // Fetch activity
  const activity = await fetchActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/tweet/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="Profile Picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p>
                    <span className="text-primary-500 mr-1">
                      {activity.author.name}
                    </span>{" "}
                    replied to your tweet
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p>No activity yet</p>
        )}
      </section>
    </section>
  );
};

export default Page;
