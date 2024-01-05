import React from "react";
import PostDetailsCard  from "../Cards/PostDetailsCard.tsx";
// import { useNavigate } from "react-router-dom";

// https://ahooks.js.org/hooks/use-infinite-scroll
const PostsWrapper : React.FC<any> = () => {
  // const  navigate = useNavigate();

  const  dataArr = [
    {
      userpostId: 1,
      userProfileImage: "https://picsum.photos/id/146/40/40",
      userPostImage: "https://picsum.photos/id/146/800/600",
      userProfileName: "Scripts",
      userProfileUsername: "scriptscrypt",
      userProfilePostText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      userpostId: 2,
      userProfileImage: "https://picsum.photos/id/193/40/40",
      userPostImage: "https://picsum.photos/id/193/800/600",
      userProfileName: "Test",
      userProfileUsername: "Test",
      userProfilePostText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  
  return (
    <>
      <div className="">
        {dataArr.map((item) => (
          <PostDetailsCard
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

export default PostsWrapper;