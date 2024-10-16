import Image from "next/image";
import Link from "next/link";
import React from "react";

import LikeIcon from "../icons/LikeIcon";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { LuSend } from "react-icons/lu";
import { comment } from "postcss";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const TweetCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {
  return (
    <article
      className={`flex flex-col rounded-sm w-full ${
        isComment ? "px-0 sm:px-7 bg-black" : "bg-zinc-900 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="relative mt-2 w-0.5 grow rounded-full bg-zinc-700" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer">{author.name}</h4>
            </Link>

            <p className="mt-2 font-extralight">{content}</p>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-5 items-center">
                <LikeIcon />
                <Link href={`/tweet/${id}`}>
                  <FaRegCommentDots className="cursor-pointer" />
                </Link>
                <RiShareForwardLine className="cursor-pointer" />
                <LuSend className="cursor-pointer" />
              </div>

              {isComment && comment.length > 0 && (
                <Link href={`/tweet/${id}`}>
                  <p className="mt-1 text-gray-500">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TweetCard;
