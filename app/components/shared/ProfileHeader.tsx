import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile image"
              fill
              className="rounded-full object-cover bg-slate-500 shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left font-bold text-2xl">{name}</h2>
            <p className="text-gray-400">@{username}</p>
          </div>
        </div>
      </div>

      {/* TODO: COMMUNITY */}

      <p className="mt-6 max-w-lg text-base">{bio}</p>
      <div className="mt-12 h-0.5 w-full" />
    </div>
  );
};

export default ProfileHeader;
