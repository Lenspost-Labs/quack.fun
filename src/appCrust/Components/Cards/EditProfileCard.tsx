import React, { useState } from "react";
// @ts-ignore
import MdEdit from "@meronex/icons/md/MdEdit";
import { Button, Upload, UploadProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import ImgCrop from "antd-img-crop";
const EditProfileCard = ({
  userPicture,
  userBannerPicture,
  userUsername,
  userProfileName,
  userProfileBio,
  userBioMentionedProfiles,
}: ProfileType) => {
  const [userDetails, setUserDetails] = useState({
    userUsername: userUsername,
    userPicture: userPicture,
    userBannerPicture: userBannerPicture,
    userProfileName: userProfileName,
    userProfileBio: userProfileBio,
  });

  const handleUserDetails = (e: any) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleFileInputs = (e: any) => {
    const { name, files } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: files[0],
    });

    console.log(userDetails);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,

    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // use BE URL here
    action: "",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      console.log(info);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setUserDetails({
          ...userDetails,
          [info.file.name]: info.file,
        });

        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <div className="flex flex-col items-start  gap-4">
        <div className="flex w-full items-end gap-2">
          <img
            src={userDetails?.userBannerPicture}
            alt={`Banner Picture of ${userDetails?.userProfileName}`}
            title={`Banner Picture of ${userDetails?.userProfileName}`}
            width="100%"
            height="48"
            className="h-32 rounded-md"
          />
          <ImgCrop
            aspectSlider
            aspect={2 / 1}
            rotationSlider
            showReset
            resetText="Reset"
          >
            <Upload
              {...props}
              onChange={(e) => handleFileInputs(e)}
              name="userBannerPicture"
            >
              <Button icon={<MdEdit />}></Button>
            </Upload>
          </ImgCrop>
        </div>

        <div className="flex items-end gap-2">
          <img
            src={userDetails?.userPicture}
            alt={`Profile Picture of ${userDetails?.userProfileName}`}
            title={`Profile Picture of ${userDetails?.userProfileName}`}
            width="56"
            height="56"
            className="max-w-full rounded-full"
          />

          <Upload
            {...props}
            onChange={(e) => handleFileInputs(e)}
            name="userPicture"
          >
            <Button icon={<MdEdit />}></Button>
          </Upload>
        </div>

        <TextArea
          defaultValue={userProfileName}
          placeholder={"Name"}
          name="userProfileName"
          onChange={handleUserDetails}
          autoSize
        />
        <TextArea
          defaultValue={userUsername}
          placeholder={"Username"}
          name="userUsername"
          onChange={handleUserDetails}
          autoSize
        />
        <TextArea
          defaultValue={userProfileBio}
          placeholder={"Bio"}
          name="userProfileBio"
          onChange={handleUserDetails}
          autoSize
        />
      </div>
    </>
  );
};

export default EditProfileCard;
