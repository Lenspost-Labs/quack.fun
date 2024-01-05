import { Tabs, TabsProps } from "antd";
import React from "react";
import PostsWrapper from "./PostsWrapper";
import ProfileSectionCard from "../Cards/ProfileSectionCard";
import CommentsWrapper from "./CommentsWrapper";

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
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <>
      <div className="m-4 md:m-0">
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
