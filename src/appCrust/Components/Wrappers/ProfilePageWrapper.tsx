import { Tabs, TabsProps } from "antd";
import React from "react";
import PostsWrapper from "./PostsWrapper";
import ProfileSectionCard from "../Cards/ProfileSectionCard";
import CommentsWrapper from "./CommentsWrapper";
import { Link } from "react-router-dom";

// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";

const ProfilePageWrapper = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Posts",
      //   className: "bg-blue-100",
      children: <PostsWrapper />,
    },
    {
      key: "2",
      label: "Replies",
      children: <CommentsWrapper />,
    },
    {
      key: "3",
      label: "Likes",
      children: <PostsWrapper />,
    },
  ];
  return (
    <>
      <div className="m-4 md:m-0">
        <div className="flex m-2">
          <div className="mt-2">
            {" "}
            <Link to="/feed">
              {" "}
              <BsArrowLeft size={24} />{" "}
            </Link>{" "}
          </div>
          <div className="m-2">Profile</div>
        </div>

        <ProfileSectionCard />
        <Tabs
          className="mt-4"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default ProfilePageWrapper;
