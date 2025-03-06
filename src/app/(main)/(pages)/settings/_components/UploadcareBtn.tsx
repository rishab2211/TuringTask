"use client"; // is needed only if you’re using React Server Components
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";

import React from "react";

const UploadcareBtn = () => {
  return (
    <div>
      <FileUploaderRegular
        sourceList="local, camera, facebook, gdrive"
        cameraModes="photo, video"
        classNameUploader="uc-light"
        pubkey="690b977cb2980b9593d7"
      />
    </div>
  );
};

export default UploadcareBtn;
