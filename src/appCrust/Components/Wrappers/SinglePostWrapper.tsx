import React, { useEffect, useState } from "react";
import PostDetailsCard from "../Cards/PostDetailsCard";
import { apiGetPosts } from "src/services/BEApis/PostsAPIs/PostsApi";
import { Spin } from "antd";
import { Outlet, useLoaderData, useParams, Link } from "react-router-dom";
// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";

const SinglePostWrapper = () => {
  const { postId } = useParams();
  console.log("postId", postId);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  const fnGetAllPosts = async () => {
    setLoading(true);
    const allPostsRes = await apiGetPosts();
    console.log(allPostsRes);
    setPosts(allPostsRes?.data?.posts);
    setLoading(false);
  };

  useEffect(() => {
    // fnGetAllPosts();
  });
  return (
    <>
      {loading && (
        <div>
          {" "}
          <Spin />
        </div>
      )}
      <div className="m-4 md:m-0">
        <div className="flex m-2">
          <div className="mt-2">
            {" "}
            <Link to="/feed">
              {" "}
              <BsArrowLeft size={24} />{" "}
            </Link>{" "}
          </div>
          <div className="m-2">Post</div>
        </div>
      </div>
      {!loading && posts.length === 0 && <div>No Posts Found</div>}

      {postId && (
        <PostDetailsCard
          userPostId={postId}
          postLikes={"10"}
          userProfileImage={`https://picsum.photos/${postId + 300}/400/40/40`}
          userProfileName={"Scripts"}
          userProfileUsername={`userid${postId}`}
          userPostImage={`https://picsum.photos/${postId + 300}600/800/600`}
          userProfilePostText={"test"}
        />
      )}
      <Outlet />
    </>
  );
};

export default SinglePostWrapper;
