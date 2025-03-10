"use client";

import Image from "next/image";
import UploadcareBtn from "./UploadcareBtn";
import { useEffect, useState, useTransition } from "react";
import { span } from "framer-motion/client";
import { Loader2Icon } from "lucide-react";

type Props = {
  userImage: string | null;
  onRemove: (Uuid: string) => void;
  onUpload: (imageUrl: string) => Promise<void>;
  Uuid: string;
};

const ProfilePicture = ({ userImage, onUpload, Uuid, onRemove }: Props) => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col  items-center">
      <p className="text-lg font-semibold text-white">Profile Picture</p>
      <div className="flex h-[30vh] flex-col items-center justify-center">
        {userImage ? (
          <>
            <div className="relative w-35 h-35 rounded-full overflow-hidden mb-4">
              <Image
                src={`https://ucarecdn.com/${userImage}/`}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() => {
                onRemove(Uuid);
                setIsLoading(true);
              }}
              className="mt-2 text-red-500"
            >
              {isLoading? <span className="flex items-center gap-1">Removing <Loader2Icon className="animate-spin" size={20} /></span>:<span>Remove image</span>}
            </button>
          </>
        ) : (
          <>
            <div className="relative w-35 h-35 flex bg-slate-900 p-2 justify-center items-center rounded-full overflow-hidden mb-4">
              <p>No profile photo</p>
            </div>
            <UploadcareBtn onUpload={onUpload} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
