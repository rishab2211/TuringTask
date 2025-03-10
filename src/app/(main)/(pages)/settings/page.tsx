import ProfileForm from "@/components/forms/ProfileForm";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import ProfilePicture from "./_components/ProfilePicture";
import { revalidatePath } from "next/cache";
import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";

const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
  publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
  secretKey: process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY as string,
});

const SettingsPage = async () => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const User = await db.user?.findUnique({ where: { clerkId: authUser.id } });

  console.log(User?.profileImage);

  const Uuid = User?.profileImage;

  const removeProfileImage = async (Uuid: string) => {
    "use server";

    const result = await deleteFile(
      {
        uuid: Uuid,
      },
      { authSchema: uploadcareSimpleAuthSchema }
    );
    const response = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        profileImage: "",
      },
    });
    revalidatePath("/settings");
  };

  async function uploadProfileImage(imageUrl: string) {
    "use server";

    const response = await db.user.update({
      where: {
        clerkId: authUser?.id,
      },
      data: {
        profileImage: imageUrl,
      },
    });
    revalidatePath("/settings");
  }

  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="text-3xl sticky top-0 z-[10] p-4 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Settings
      </h1>

      <div className="flex flex-col-reverse md:flex-row justify-around gap-10 p-6">
        <div className="text-2xl flex flex-col gap-2">
          <h2 className="text-3xl font-bold">User Profile</h2>
          <p>Add or update your information.</p>
          <ProfileForm />
        </div>
        <ProfilePicture
          onRemove={removeProfileImage}
          userImage={User?.profileImage || ""}
          onUpload={uploadProfileImage}
          Uuid={Uuid || ""}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
