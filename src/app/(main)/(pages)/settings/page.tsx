import ProfileForm from "@/components/forms/ProfileForm";
import ProfilePicture from "./_components/ProfilePicture";

type Props = {};

const SettingsPage = (props: Props) => {
  return (
    <div className=" flex flex-col gap-4 relative ">
      <h1 className=" text-3xl sticky top-0 z-[10] p-4 bg-background/50 backdrop-blur-lg flex items-center border-b ">
        Settings
      </h1>

      <div className=" flex justify-around gap-10 p-6 ">
        <div className="text-2xl">
          <h2 className="text-3xl font-bold">User Profile</h2>
          <p>Add or update your information.</p>
          {/* TODO : Profile picture */}
          <ProfileForm />
        </div>
        <ProfilePicture />
      </div>
    </div>
  );
};

export default SettingsPage;
