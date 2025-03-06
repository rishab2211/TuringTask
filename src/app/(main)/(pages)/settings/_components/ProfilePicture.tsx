import UploadcareBtn from "./UploadcareBtn";

type Props = {};

const ProfilePicture = (props: Props) => {
  return (
    <div className=" flex flex-col ">
      <p className="text-lg text-white">Profile Picture</p>
      <div className=" flex h-[30vh] flex-col items-center justify-center  ">
        <UploadcareBtn/>
      </div>
    </div>
  );
};

export default ProfilePicture;
