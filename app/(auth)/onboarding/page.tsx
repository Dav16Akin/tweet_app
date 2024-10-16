import AccountProfile from "@/app/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";
import "../../../styles/globals.css";
import React from "react";

const Onboarding = async () => {
  const user = await currentUser();

  const userInfo = {};

  const userData = {
    id: user?.id,
    objectid: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || userInfo?.firstname || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
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
