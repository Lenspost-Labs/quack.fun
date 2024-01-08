import React, { useState } from "react";
import { Button, Modal } from "antd";
import EditProfileCard from "../Cards/EditProfileCard.tsx";

const ProfileSectionCard: React.FC<ProfileType> = ({
  userPicture,
  userBannerPicture,
  userUsername,
  userProfileName,
  UserProfileBio,
}: ProfileType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className="flex min-h-[2rem] flex-col gap-0 w-full">
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
            <p className="mt-1 truncate text-sm text-slate-500">
              {userUsername}
            </p>
          </div>

          <div className="">
            <Button
              type="default"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Edit Profile
            </Button>
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
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          okButtonProps={{ color: "yellow", type: "primary" }}
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
