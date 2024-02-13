import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import PostsWrapper from "./PostsWrapper";
import ProfileSectionCard from "../Cards/ProfileSectionCard";
import { useParams } from "react-router-dom";

// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";
import NestedPostsWrapper from "./NestedPostsWrapper";
import HeaderWithBackBtn from "../Items/HeaderWithBackBtn";
import { apiUserDetailsforFID } from "src/services/BEApis/auth/AuthAPIs";

const ProfilePageWrapper = () => {
  const { userFid } = useParams();

  const [profileInfo, setProfileInfo] = useState({
    bio: { mentionedProfiles: [], text: "" },
    displayName: "",
    username: "",
    fid: "",
    pfp: "",
    follower: [],
    following: [],
  });

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Posts",
      //   className: "bg-blue-100",
      children: <PostsWrapper isInFeed={false} />,
    },
    {
      key: "2",
      label: "Replies",
      children: <NestedPostsWrapper />,
    },
    {
      key: "3",
      label: "Likes",
      // children: <PostsWrapper />,
    },
  ];

  // Fetch data from API - Profile
  // Fetch using username or userId from params
  const fnGetProfileInfo = async () => {
    const profileInfoRes = await apiUserDetailsforFID(userFid ? userFid : "");

    console.log("profileInfo", profileInfoRes);
    setProfileInfo(profileInfoRes as any);
  };

  useEffect(() => {
    fnGetProfileInfo();
  }, []);

  return (
    <>
      <HeaderWithBackBtn
        headerName={userFid ? userFid : "Profile"}
        backToPath="/feed"
      />
      {/* Sample - Using Username */}
      <ProfileSectionCard
        userUsername={profileInfo?.username}
        userProfileName={profileInfo?.displayName}
        userPicture={profileInfo?.pfp}
        userBannerPicture={"https://picsum.photos/id/146/200/200"}
        userProfileBio={profileInfo?.bio?.text}
        userBioMentionedProfiles={profileInfo?.bio?.mentionedProfiles[0]}
        userFollowers={profileInfo?.follower}
        userFollowing={profileInfo?.following}
        userIsBeingFollowed={false}
      />
      <div className="bg-white mx-4">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default ProfilePageWrapper;
