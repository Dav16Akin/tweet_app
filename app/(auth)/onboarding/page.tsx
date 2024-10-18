import AccountProfile from "@/app/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";
import "../../../styles/globals.css";
import React from "react";
import { redirect } from "next/navigation";
import { fetchUser } from "@/app/lib/actions/user.action";

const Onboarding = async () => {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className="mx-auto flex flex-col px-20 py-10 gap-2 justify-start text-white bg-black max-w-3xl ">
      <h1 className="text-3xl font-bold ">Onboarding</h1>
      <p>Complete your profile now to use Tweet</p>

      <section className="mt-9">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default Onboarding;
