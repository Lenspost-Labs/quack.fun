import React from "react";
import CommentsCard from "../Cards/CommentsCard";

const CommentsWrapper = () => {
    
  const dataArr = [
    {
      userpostId: 1,
      commentUserImage: "https://picsum.photos/id/146/40/40",
      commentAction: "Replied",
      commentUser: "Scripts",
      commentUsername: "scriptscrypt",
      commentText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      commentTimeStamp: "2 hours ago",
    },
    {
      userpostId: 2,
      commentUserImage: "https://picsum.photos/id/193/40/40",
      commentAction: "Commented",
      commentUser: "Test",
      commentUsername: "Test",
      commentText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

      commentTimeStamp: "2 hours ago",
    },
  ];

  return (
    <>
      <div className="">
        {dataArr.map((item) => (
          <CommentsCard
            key={item.userpostId}
            // onClick={() => {
            //   navigate(`/post/${item.userpostId}`);
            // }}
            {...item}
          />
        ))}
      </div>
    </>
  );
};

export default CommentsWrapper;
