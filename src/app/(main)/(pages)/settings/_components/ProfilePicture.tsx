"use client";

import Image from "next/image";
import UploadcareBtn from "./UploadcareBtn";
import { useEffect, useTransition } from "react";

type Props = {
  userImage: string | null;
  onRemove: (Uuid: string) => void;
  onUpload: (imageUrl: string) => Promise<void>;
  Uuid: string;
};

const ProfilePicture = ({ userImage, onUpload, Uuid, onRemove }: Props) => {
  return (
    <div className="flex flex-col  items-center">
      <p className="text-lg font-semibold text-white">Profile Picture</p>
      <div className="flex h-[30vh] flex-col items-center justify-center">
        {userImage ? (
          <>
            {" "}
            <div className="relative w-35 h-35 rounded-full overflow-hidden mb-4">
              <Image
                src={`https://ucarecdn.com/${userImage}/`}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() => onRemove(Uuid)}
              className="mt-2 text-red-500"
            >
              Remove Image
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
