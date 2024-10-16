import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/app/lib/actions/user.action';
import PostTweet from '@/app/components/forms/PostTweet';

const page = async () => {
    const user = await currentUser();

    if(!user) return null

    const userInfo = await fetchUser(user.id)

    if(!userInfo?.onboarded) redirect("/onboarding")

  return (
    <>
        <h1>Create Tweet</h1>

        <PostTweet userId={userInfo._id}/>
    </>
  )
}

export default page