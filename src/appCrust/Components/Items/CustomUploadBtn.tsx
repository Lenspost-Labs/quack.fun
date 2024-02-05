import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
// import type { UploadChangeParam } from "antd/es/upload";
import type { UploadProps } from "antd/es/upload/interface";
// @ts-ignore
import BsUpload from "@meronex/icons/bs/BsUpload";
import useUser from "src/hooks/userHooks/useUser";

const CustomUploadBtn = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);

  // Image upload state - To Store BE URL
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const { jwt } = useUser();

  // Function to get base64 of image
  // const getBase64 = (img: RcFile, callback: (url: string) => void) => {

  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result as string));
  //   reader.readAsDataURL(img);
  // };

  // ---- Function to check for image type and size ----

  // const beforeUpload = (file: RcFile) => {
  // Uncomment this - to allow uploading only specific type [JPG/PNG] files
  // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  // if (!isJpgOrPng) {
  //   message.error("You can only upload JPG/PNG file!");
  // }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error("Image must smaller than 2MB!");
  // }
  // return isJpgOrPng && isLt2M;
  // };

  // ---- Another Way of handling image upload ----

  // const handleChange: UploadProps["onChange"] = (
  //   info: UploadChangeParam<UploadFile>
  // ) => {
  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     // Get the File URL from Backend API
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };

  // To display Upload Button once more even after uploading a few images
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const props: UploadProps = {
    name: "file",
    // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    // Use BE URL here
    action: "",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log("Uploading");
        console.log(info.file.thumbUrl?.toString());

        // console.log(info.file, info.fileList);
        setLoading(true);
      }
      if (info.file.status === "done") {
        setLoading(false);
        setImageUrl(info.file.response.url);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      setLoading(false);  
    },
  };

  return (
    <>
      {/* <ImgCrop aspectSlider aspect={2/ 1} rotationSlider showReset resetText="Reset"> */}
      <Upload
        multiple={true}
        name="avatar"
        listType="picture-card"
        className={`avatar-uploader ${className}`}
        showUploadList={true}
        // beforeUpload={beforeUpload}
        {...props}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      {/* </ImgCrop> */}
    </>
  );
};

export default CustomUploadBtn;
