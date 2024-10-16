"use client"
import { useState } from "react";

import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
const LikeIcon = () => {
  const [isliked, setIsLiked] = useState(false);

  const toggle = () => {
    setIsLiked(!isliked)
  }

  return <div> {isliked ? <IoMdHeart className="heart" onClick={toggle} /> : <IoIosHeartEmpty className="heart" onClick={toggle} /> }</div>;
};

export default LikeIcon;
