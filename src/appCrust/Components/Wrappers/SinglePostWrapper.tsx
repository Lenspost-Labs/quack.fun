import React, { useEffect, useState } from "react";
import PostDetailsCard from "../Cards/PostDetailsCard";
// import { apiGetPosts } from "src/services/BEApis/PostsAPIs/PostsApi";
// import { Spin } from "antd";
import { Outlet, useParams } from "react-router-dom";
// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";
import HeaderWithBackBtn from "../Items/HeaderWithBackBtn";
import { apiViewSinglePost } from "src/services/BEApis/PostsAPIs/PostsApi";

const SinglePostWrapper = () => {
  const { postFid, postHash } = useParams();
  console.log(postFid, postHash);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  // sample api call
  const fnGetSinglePost = async () => {
    setLoading(true);
    const singlePostRes = await apiViewSinglePost({
      fid: Number(postFid),
      hash: postHash,
    });
    console.log(singlePostRes);
    setPosts(singlePostRes?.data?.posts);
    setLoading(false);
  };

  useEffect(() => {
    fnGetSinglePost();
  }, []);
  return (
    <>
      <HeaderWithBackBtn headerName={"Post"} backToPath="/feed" />

      {postFid && (
        <PostDetailsCard
          userpostFid={postFid}
          postLikes={"10"}
          userProfileImage={`https://picsum.photos/seed/picsum/40/40`}
          userProfileName={"Scripts"}
          userProfileUsername={`userid${postFid}`}
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
