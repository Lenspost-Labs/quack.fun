import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import PostsWrapper from "./PostsWrapper";
import ProfileSectionCard from "../Cards/ProfileSectionCard";
import { Navigate, useParams } from "react-router-dom";

// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";
import NestedPostsWrapper from "./NestedPostsWrapper";
import HeaderWithBackBtn from "../Items/HeaderWithBackBtn";
import { apiUserDetailsforFID } from "src/services/BEApis/auth/AuthAPIs";
import { apiGetCastsForFid } from "src/services/BEApis/PostsAPIs/PostsApi";

const ProfilePageWrapper = () => {
  const { userFid } = useParams();

  const [profileInfo, setProfileInfo] = useState({
    bio: { mentionedProfiles: [], text: "" },
    name: "",
    username: "",
    fid: userFid,
    pfp: "",
    follower: [],
    following: [],
  });

  // Fetch using username or userId from params
  const fnGetProfileInfo = async () => {
    const profileInfoRes = await apiUserDetailsforFID(userFid ? userFid : "");

    // console.log("profileInfo", profileInfoRes);
    setProfileInfo(await profileInfoRes);
    console.log("author in profileInfo", profileInfo);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Posts",
      //   className: "bg-blue-100",
      children:
        // Render the PostsWrapper only if profileInfo is not empty
        (profileInfo?.name !== "" ||
          profileInfo?.username !== "" ||
          profileInfo?.pfp !== "") &&
        userFid == profileInfo?.fid ? (
          <PostsWrapper
            authorFid={userFid}
            author={profileInfo}
            isInFeed={false}
          />
        ) : <Navigate to={`/${userFid}`} />,
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
  useEffect(() => {
    fnGetProfileInfo();
  }, [userFid]);

  return (
    <>
      <HeaderWithBackBtn
        headerName={userFid ? `FID: ${userFid}` : "Profile"}
        backToPath="/feed"
      />
      {/* Sample - Using Username */}
      <ProfileSectionCard
        userUsername={profileInfo?.username}
        userProfileName={profileInfo?.name}
        userPicture={profileInfo?.pfp}
        userBannerPicture={"https://picsum.photos/id/80/200/200"}
        userProfileBio={profileInfo?.bio?.text}
        userBioMentionedProfiles={profileInfo?.bio?.mentionedProfiles[0]}
        userFollowers={profileInfo?.follower}
        userFollowing={profileInfo?.following}
        userIsBeingFollowed={false}
        userFid={profileInfo?.fid}
      />
      <div className="bg-white mx-4">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default ProfilePageWrapper;
