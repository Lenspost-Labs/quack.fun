import React, { useEffect, useState } from "react";
import PostDetailsCard from "../Cards/PostDetailsCard";
// import { apiGetPosts } from "src/services/BEApis/PostsAPIs/PostsApi";
// import { Spin } from "antd";
import { Outlet, useParams } from "react-router-dom";
// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";
import HeaderWithBackBtn from "../Items/HeaderWithBackBtn";
import { apiViewSinglePost } from "src/services/BEApis/PostsAPIs/PostsApi";
import { utilXtimeAgo } from "../Utils/functions/utilXtimeAgo";
import { apiUserDetailsforFID } from "src/services/BEApis/auth/AuthAPIs";
import { Spin } from "antd";

const SinglePostWrapper = () => {
  const { postFid, postHash } = useParams();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
    bio: { mentionedProfiles: [], text: "" },
    name: "",
    username: "",
    fid: postFid,
    pfp: "",
    follower: [],
    following: [],
  });

  const fnGetSinglePost = async () => {
    setLoading(true);
    const singlePostRes = await apiViewSinglePost({
      fid: Number(postFid),
      hash: postHash,
    });
    console.log("singlePostRes", singlePostRes);
    setPosts(singlePostRes?.data);
    setLoading(false);
  };

  // For Getting User Details
  const fnGetProfileInfo = async () => {
    const profileInfoRes = await apiUserDetailsforFID(postFid ? postFid : "");

    console.log("profileInfo", profileInfoRes);
    setProfileInfo(profileInfoRes);
    // console.log("profileInfo", profileInfo);
  };

  useEffect(() => {
    fnGetProfileInfo();
  }, []);

  useEffect(() => {
    fnGetSinglePost();
  }, []);

  return (
    <>
      <HeaderWithBackBtn headerName={"Post"} backToPath="/feed" />
      {loading && <Spin />}
      {posts?.map((item, index) => {
        return (
          <PostDetailsCard
            key={index}
            userPostId={item.hash}
            postLikes={item?.reaction?.LIKE}
            postRecasts={item?.reaction?.RECAST}
            userProfileImage={profileInfo?.pfp}
            userProfileName={profileInfo?.name}
            userProfileUsername={profileInfo?.username}
            userPostImage={item?.embeds?.[0] ? item?.embeds?.[0]?.image : null}
            postAuthorFid={profileInfo?.fid}
            userPostTimestamp={utilXtimeAgo(item.timestamp)}
            userProfilePostText={item.body}
            frameTitle={item.firstPart}
            frameLink={item?.embeds?.[0] ? item?.embeds?.[0]?.url : null}
          />
        );
      })}
      <Outlet />
    </>
  );
};

export default SinglePostWrapper;
