import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
