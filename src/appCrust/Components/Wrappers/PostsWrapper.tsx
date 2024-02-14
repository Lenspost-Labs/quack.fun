import React, { useEffect, useState } from "react";
import PostDetailsCard from "../Cards/PostDetailsCard.tsx";
import {
  apiGetFeed,
  apiGetPosts,
} from "src/services/BEApis/PostsAPIs/PostsApi.tsx";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { utilXtimeAgo } from "../Utils/functions/utilXtimeAgo.tsx";

const PostsWrapper: React.FC<{ isInFeed: boolean; author?: any }> = ({
  isInFeed,
  author,
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [noOfPosts, setNoOfPosts] = useState(10);

  // const author = {
  //   name: "Wojak",
  //   pfp: "https://i.imgur.com/2X1YTWt.jpg",
  //   username: "wojak",
  //   fid: 237227,
  // };

  const updatePostsWithAuthor = (newPosts: any[]) => {
    const updatedPosts = newPosts.map((post) => ({
      ...post,
      author: { ...author },
    }));
    console.log("updated posts", updatedPosts);
    setPosts(updatedPosts);
  };

  const fnGetAllPosts = async () => {
    setLoading(true);

    const res = await apiGetPosts();
    console.log("res in fnGetAllPosts", res);

    setPosts(res?.data?.casts);
    updatePostsWithAuthor(res?.data?.casts);
    setLoading(false);
  };

  const fnGetFeed = async () => {
    setLoading(true);

    const res = await apiGetFeed();
    console.log("res in fnGetFeed", res);
    // --- Working code : Frames ---
    // const unsplitPosts = res?.data?.feed.slice(0, noOfPosts);

    // const splitStrings = unsplitPosts.map((str: string, index: any) => {
    //   const indexOfHttps = str.indexOf("https://");

    //   if (indexOfHttps !== -1) {
    //     const firstPart = str.substring(0, indexOfHttps);
    //     const secondPart = str.substring(indexOfHttps);
    //     return { firstPart, secondPart };
    //   } else {
    //     return { firstPart: str, secondPart: "" };
    //   }
    // });

    // setPosts(splitStrings);
    setPosts(res?.data);

    setLoading(false);
  };

  const fnLoadPosts = async () => {
    if (isInFeed) {
      fnGetFeed();
    } else {
      fnGetAllPosts();
    }
  };
  useEffect(() => {
    fnLoadPosts();
  }, [isInFeed, noOfPosts]);

  return (
    <>
      <div className="">
        {loading && (
          <div>
            {" "}
            <Spin />
          </div>
        )}
        {posts && posts.length === 0 && <div>No Posts Found</div>}
        {!posts && !loading && !localStorage.getItem("jwt") && (
          <div>Please Login to View Posts</div>
        )}

        {!loading && posts && posts?.length > 0 ? (
          <>
            <InfiniteScroll
              dataLength={posts?.length}
              next={() => {
                console.log(
                  "Next called, Loading Posts from noOfPosts",
                  noOfPosts
                );
                setNoOfPosts(noOfPosts + 10);
                // fnGetAllPosts();
                fnLoadPosts();
              }}
              hasMore={true}
              loader={
                <h4>
                  {" "}
                  <Spin />{" "}
                </h4>
              }
              scrollableTarget="InfScrolltarget"
              endMessage={
                <p>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {posts?.map((item, index) => {
                return (
                  <PostDetailsCard
                    key={index}
                    userPostId={item.hash}
                    postLikes={item?.reaction?.LIKE}
                    userProfileImage={item?.author?.pfp}
                    userProfileName={item?.author?.displayName}
                    userProfileUsername={item?.author?.username}
                    userPostImage={
                      item?.embeds?.[0] ? item?.embeds?.[0]?.image : null
                    }
                    postAuthorFid={item?.author?.fid}
                    userPostTimestamp={utilXtimeAgo(item.timestamp)}
                    userProfilePostText={item.body}
                    frameTitle={item.firstPart}
                    frameLink={
                      item?.embeds?.[0] ? item?.embeds?.[0]?.url : null
                    }
                  />
                );
              })}
            </InfiniteScroll>
          </>
        ) : (
          <div className=""> No Posts Found </div>
        )}
      </div>
    </>
  );
};

export default PostsWrapper;
