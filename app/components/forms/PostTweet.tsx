"use client";

import React, { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { TweetValidation } from "@/app/lib/validations/tweet";
import { createTweet } from "@/app/lib/actions/tweet.actions";
import { useOrganization } from "@clerk/nextjs";

// import { updateUser } from "../lib/actions/user.action";

interface Props {
  user: {
    id: string;
    ogjectid: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const PostTweet = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(TweetValidation),
    defaultValues: {
      tweet: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof TweetValidation>) => {
    
    await createTweet({
      text: values.tweet,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    // if(!organization) {
    //   await createTweet({
    //     text: values.tweet,
    //     author: userId,
    //     communityId: null,
    //     path: pathname,
    //   });
    // }else {
    //   await createTweet({
    //     text: values.tweet,
    //     author: userId,
    //     communityId: organization.id,
    //     path: pathname,
    //   });
    // }

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 mt-10 "
      >
        <FormField
          control={form.control}
          name="tweet"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel>Content</FormLabel>
              <FormControl className="no-focus">
                <Textarea
                  rows={15}
                  className="no-focus border border-gray-400 bg-neutral-800"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-indigo-500 mt-8 hover:bg-indigo-800"
        >
          Post Tweet
        </Button>
      </form>
    </Form>
  );
};

export default PostTweet;
