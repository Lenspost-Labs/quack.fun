import React from "react";
// @ts-ignore
import MdEdit from "@meronex/icons/md/MdEdit";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
const EditProfileCard = ({
  userPicture,
  userBannerPicture,
  userUsername,
  userProfleName,
  UserProfileBio,
}: ProfileType) => {
  return (
    <>
      <div className="flex flex-col items-start  gap-4">
        <div className="flex w-full items-end gap-2">
          <img
            src={userBannerPicture}
            alt={userProfleName}
            title={userProfleName}
            width="100%"
            height="48"
            className="h-32 rounded-md"
          />
          <Button type="text" shape="circle" icon={<MdEdit size={12} />} />
        </div>

        <div className="flex items-end gap-2">
          <img
            src={userPicture}
            alt={userProfleName}
            title={userProfleName}
            width="56"
            height="56"
            className="max-w-full rounded-full"
          />
          <Button type="text" shape="circle" icon={<MdEdit size={12} />} />
        </div>
        <TextArea
          defaultValue={userProfleName}
          placeholder={userProfleName}
          autoSize
        />
        <TextArea
          defaultValue={userUsername}
          placeholder={userUsername}
          autoSize
        />
        <TextArea
          defaultValue={UserProfileBio}
          placeholder={UserProfileBio}
          autoSize
        />
      </div>
    </>
  );
};

export default EditProfileCard;
