import React, { useEffect } from "react";
import PostDetailsCard from "../Cards/PostDetailsCard";
// import { apiGetPosts } from "src/services/BEApis/PostsAPIs/PostsApi";
// import { Spin } from "antd";
import { Outlet, useParams } from "react-router-dom";
// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";
import HeaderWithBackBtn from "../Items/HeaderWithBackBtn";

const SinglePostWrapper = () => {
  const { postId } = useParams();
  console.log("postId", postId);

  // const [posts, setPosts] = useState<PostType[]>([]);
  // const [loading, setLoading] = useState(false);

  // sample api call
  // const fnGetAllPosts = async () => {
  //   setLoading(true);
  //   const allPostsRes = await apiGetPosts();
  //   console.log(allPostsRes);
  //   setPosts(allPostsRes?.data?.posts);
  //   setLoading(false);
  // };

  // To ignore TS Warning
  // fnGetAllPosts();

  useEffect(() => {
    // fnGetAllPosts();
  }, []);
  return (
    <>
      <HeaderWithBackBtn
        headerName={"Post"} 
        backToPath="/feed"
      />

      {postId && (
        <PostDetailsCard
          userPostId={postId}
          postLikes={"10"}
          userProfileImage={`https://picsum.photos/seed/picsum/40/40`}
          userProfileName={"Scripts"}
          userProfileUsername={`userid${postId}`}
          userPostImage={`https://picsum.photos/seed/picsum/200/300`}
          userProfilePostText={
            "test lorem ipsum lorem ipsum lorem ipsum lorem ipsum dolor sit amet consectetur adipiscing elit"
          }
        />
      )}
      <Outlet />
    </>
  );
};

export default SinglePostWrapper;
