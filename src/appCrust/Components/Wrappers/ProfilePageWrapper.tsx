import { Tabs, TabsProps } from "antd";
import React, { useEffect } from "react";
import PostsWrapper from "./PostsWrapper";
import ProfileSectionCard from "../Cards/ProfileSectionCard";
import { useParams } from "react-router-dom";

// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";
import NestedPostsWrapper from "./NestedPostsWrapper";
import HeaderWithBackBtn from "../Items/HeaderWithBackBtn";

const ProfilePageWrapper = () => {
  const { username } = useParams();
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
    console.log("username", username);
  };

  useEffect(() => {
    fnGetProfileInfo();
  }, []);

  return (
    <>
      <HeaderWithBackBtn
        headerName={username ? username : "Profile"}
        backToPath="/feed"
      />
      {/* Sample - Using Username */}
      <ProfileSectionCard
        userUsername={username ? username : "No Username"}
        userProfileName={"Scripts"}
        userPicture={"https://picsum.photos/id/146/40/40"}
        userBannerPicture={"https://picsum.photos/id/146/200/200"}
        UserProfileBio={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore . "
        }
      />
      <div className="bg-white mx-4">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default ProfilePageWrapper;
