import React, { useState } from "react";
import { Button, Modal, Tooltip, message } from "antd";
import EditProfileCard from "../Cards/EditProfileCard.tsx";
// @ts-ignore
import MdEdit from "@meronex/icons/md/MdEdit";
import { utilCopyToClip } from "../Utils/functions/utilCopyToClip.tsx";
import { useWallet } from "@solana/wallet-adapter-react";

const ProfileSectionCard: React.FC<ProfileType> = ({
  userPicture,
  userBannerPicture,
  userUsername,
  userProfileName,
  userProfileBio,
  userBioMentionedProfiles,
  userFollowers,
  userFollowing,
  userIsFollowing,
}: ProfileType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserfollowed, setIsUserfollowed] = useState(false);
  const { publicKey: address } = useWallet();

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
              className="rounded-full w-12 h-12"
            />
            <h4 className="mt-2 truncate text-base text-slate-700">
              {userProfileName}
            </h4>
            <div className="mt-1 truncate text-sm text-slate-500">
              @{userUsername}
            </div>
            {address && (
              <Tooltip placement="bottomLeft" title="Click to Copy">
                <div
                  onClick={() => utilCopyToClip(address?.toString() || "")}
                  className="cursor-pointer mt-1 truncate text-sm text-slate-500"
                >
                  {address?.toString()}
                </div>
              </Tooltip>
            )}
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
        <div className="flex flex-row gap-4">
          <div className="">
            <p className="truncate text-lg text-slate-700 text-wrap">
              {userFollowers}
            </p>
            <p className="truncate text-sm text-slate-500 text-wrap">
              Followers
            </p>
          </div>

          <div className="">
            <p className="truncate text-lg text-slate-700 text-wrap">
              {userFollowing}
            </p>
            <p className="truncate text-sm text-slate-500 text-wrap">
              Following
            </p>
          </div>
        </div>
        <p className="truncate text-sm text-slate-500 text-wrap">
          {userProfileBio}
        </p>

        {userBioMentionedProfiles && (
          <p className="truncate text-sm text-slate-500 text-wrap">
            @{userBioMentionedProfiles}
          </p>
        )}

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
            userProfileBio={userProfileBio}
            userBioMentionedProfiles={userBioMentionedProfiles}
          />
        </Modal>
      </div>
    </>
  );
};

export default ProfileSectionCard;
