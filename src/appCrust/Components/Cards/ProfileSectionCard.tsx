import React, { useState } from "react";
import { Button, Modal, Tooltip, message } from "antd";
import EditProfileCard from "../Cards/EditProfileCard.tsx";
// @ts-ignore
import MdEdit from "@meronex/icons/md/MdEdit";
import { utilCopyToClip } from "../Utils/functions/utilCopyToClip.tsx";

const ProfileSectionCard: React.FC<ProfileType> = ({
  userPicture,
  userBannerPicture,
  userUsername,
  userProfileName,
  UserProfileBio,
}: ProfileType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserfollowed, setIsUserfollowed] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    message.success("Profile updated successfully");
  };

  const handleFollowBtn = (notifyText: string) => {
    console.log(notifyText);
    message.success(notifyText);
    setIsUserfollowed(!isUserfollowed);
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-6 bg-white shadow-sm">
        <img
          src={userBannerPicture}
          alt={userProfileName}
          title={userProfileName}
          width="100%"
          height="48"
          className="h-32 rounded-sm"
        />

        <div className="flex justify-between items-center">
          <div className="flex border-yellow-500  min-h-[2rem] flex-col gap-0 w-full">
            <img
              src={userPicture}
              alt={userProfileName}
              title={userProfileName}
              width="48"
              height="48"
              className="rounded-full"
            />
            <h4 className="mt-2 truncate text-base text-slate-700">
              {userProfileName}
            </h4>
            <div className="mt-1 truncate text-sm text-slate-500">
              @{userUsername}
            </div>
            <Tooltip placement="bottomLeft"  title="Click to Copy">
              <div onClick={()=>utilCopyToClip("TestAddress")} className="cursor-pointer mt-1 truncate text-sm text-slate-500">
                0xE3811....D6
              </div>
            </Tooltip>
          </div>

          <div className="flex gap-2 mx-2">
            <Button
              type="default"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Edit Profile
            </Button>

            {isUserfollowed ? (
              <Button
                type="primary"
                onClick={() => handleFollowBtn("Followed @testuser")}
              >
                Follow
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => handleFollowBtn("Unfollowed @testuser")}
              >
                Unfollow
              </Button>
            )}
          </div>
        </div>
        <p className="truncate text-sm text-slate-500 text-wrap">
          {UserProfileBio}
        </p>

        <Modal
          title="Edit Profile"
          centered
          okText="Update"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
          cancelButtonProps={{ type: "text" }}
          okButtonProps={{ type: "primary" }}
        >
          <EditProfileCard
            userPicture={userPicture}
            userBannerPicture={userBannerPicture}
            userUsername={userUsername}
            userProfileName={userProfileName}
            UserProfileBio={UserProfileBio}
          />
        </Modal>
      </div>
    </>
  );
};

export default ProfileSectionCard;
