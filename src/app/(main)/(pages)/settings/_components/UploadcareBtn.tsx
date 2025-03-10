"use client";

import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useEffect, useState } from "react";

type Props = {
  onUpload: (value : string) => void;
  // onRemove : any;
};

function UploadcareBtn({ onUpload }: Props) {
  const [fileUuid, setFileUuid] = useState<string | null>(null);

  const handleSuccess = (info: any) => {
    // Extract the UUID from the info object
    if (info && info.uuid) {
      setFileUuid(info.uuid);
    } else if (info && typeof info === "string") {
      // Some versions might return just the UUID as a string
      setFileUuid(info);
    }
  };

  useEffect(() => {
    if (fileUuid) {
      onUpload(fileUuid);
    }
  }, [fileUuid, onUpload]);


  return (
    <div>
      <FileUploaderRegular
        sourceList="local, camera, facebook, gdrive"
        cameraModes="photo"
        className="uc-light"
        pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string}
        onFileUploadSuccess={handleSuccess}
        imgOnly = {true}
        multiple={false}
        multipleMax={1}
        
      />
    </div>
  );
}

export default UploadcareBtn;
