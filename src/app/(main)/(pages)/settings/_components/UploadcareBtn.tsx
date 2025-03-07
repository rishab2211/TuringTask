'use client'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { useState } from 'react';

type UploadProps = {
  onUpload : (url : string)=>void;
}

const UploadcareBtn = ({onUpload} : UploadProps) => {
  const [imageUrl,setImageUrl] = useState("");
  

  const handleFileUpload = async (file : any)=>{
    if(file && file.cdnUrl){
      const fileUrl = file.cdnUrl;
      setImageUrl(fileUrl);
      onUpload(fileUrl);
    }

    const uploadFile = await prisma?.user.create({
      where:{
        
      }
    })
  }
  return (
    <div>
      <FileUploaderRegular
        sourceList="local, camera, facebook, gdrive"
        cameraModes="photo, video"
        classNameUploader="uc-light"
        pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string}
      />
    </div>
  );
};

export default UploadcareBtn;
