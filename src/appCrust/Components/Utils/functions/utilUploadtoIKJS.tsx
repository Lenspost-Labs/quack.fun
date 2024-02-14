import axios from "axios";
import {
  ENV_IK_PUBLIC_KEY,
  ENV_IK_RAVESHARE_AUTH_ENDPOINT,
} from "src/config/envConfig";
import { apiUploadImage } from "src/services/BEApis/IKApis/ImageCredsAPIs";

import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import type { UploadFile, UploadProps } from "antd";

type FileType = any;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const utilUploadtoIKJS: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  // const [fileList, setFileList] = useState<UploadFile[]>([
  const [fileList, setFileList] = useState<any>([
    // {
    //   uid: "-1", //Unique ID
    //   name: "image.png", //Name of the uploaded Image
    //   status: "done", // or uploading or error
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", //URL of the uploaded Image
    // },
  ]);
  const fileInputRef = useRef(null);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  // const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   console.log("newFileList", newFileList);
  // };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    // Iterate through the newFileList and update the status property for each file object
    const updatedFileList = newFileList.map((file) => {
      // Check if the file has already been uploaded (status is "done") or if it's currently being uploaded
      // if (file.status === "done" || file.status === "uploading") {

      if (file.url?.includes("https://") || file.url?.includes("http://")) {
        // If already uploaded or uploading, keep the status unchanged
        return {
          ...file,
          uid: "-1", //Unique ID
          status: "done", // or "error" if there was an error during upload
        };
      } else {
        // Otherwise, set the status to "done" (or "error" if needed)
        return {
          ...file,
          uid: "1", //Unique ID

          status: "done", // or "error" if there was an error during upload
        };
      }
    });

    // Update the state with the updatedFileList
    setFileList(updatedFileList as UploadFile<any>[]);

    // Log the updated fileList
    console.log("Updated fileList:", updatedFileList);
  };

  const fnSetStatus = (file: any) => {
    if (file.url?.includes("https://") || file.url?.includes("http://")) {
      // If already uploaded or uploading, keep the status unchanged
      return {
        ...file,
        thumbUrl: file.url,
        status: "done", // or "error" if there was an error during upload
      };
    } else {
      // Otherwise, set the status to "done" (or "error" if needed)
      return {
        ...file,
        thumbUrl: file.url,
        status: "done", // or "error" if there was an error during upload
      };
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // -- Working Code --

  // console.log("IKUploadParams", IKUploadParams);

  const upload = async () => {
    message.loading("Uploading");
    try {
      // const fileInput = document.getElementById("file1") as HTMLInputElement;
      // This is null even when a file is selected
      const fileInput = fileInputRef.current as any as HTMLInputElement;
      const formData = new FormData();
      if (fileInput && fileInput.files) {
        formData.append("file", fileInput?.files[0]);
        console.log("fileInput.files", fileInput.files);

        const authenticationData = await axios.get(
          ENV_IK_RAVESHARE_AUTH_ENDPOINT
        );

        console.log("authenticationData", authenticationData);

        formData.append("fileName", Date.now().toString());
        formData.append("publicKey", ENV_IK_PUBLIC_KEY);
        formData.append("signature", authenticationData.data.signature || "");
        formData.append("expire", authenticationData.data.expire || 0);
        formData.append("token", authenticationData.data.token);

        const uploadResponse: any = await apiUploadImage(formData);
        // console.log(uploadResponse);
        // setUploadResponse(uploadResponse);
        // fnSetStatus(uploadResponse);
        // Assuming fnSetStatus returns the object to be appended to fileList
        const newFileObject = fnSetStatus(uploadResponse.data);

        // Update the fileList state by appending the new file object
        setFileList((prevFileList: any) => [...prevFileList, newFileObject]);

        message.destroy();
        message.success("Upload successful");
        return uploadResponse;
      } else {
        message.destroy();
        message.error("Upload failed, No file selected");
      }
    } catch (error) {
      console.error(error);
      message.destroy();
      message.error("Upload failed, please try again");
    }
  };

  return (
    <>
      <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={() => upload()}
        // onChange={handleChange}
        id="file1"
        ref={fileInputRef}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      {/* -- Working Code -- */}
      {/* <input onChange={() => upload()} type="file" id="file1" /> */}
    </>
  );
};

export default utilUploadtoIKJS;
