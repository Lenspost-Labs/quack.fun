import React, { useEffect, useState } from "react";
import PostDetailsCard from "../Cards/PostDetailsCard.tsx";
import {
  apiGetCastsForFid,
  apiGetFeed,
  apiGetPosts,
} from "src/services/BEApis/PostsAPIs/PostsApi.tsx";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { utilXtimeAgo } from "../Utils/functions/utilXtimeAgo.tsx";
import { apiGetOgs } from "src/services/BEApis/utils/UtilsApis.tsx";
import { utilGetMetaTagsData } from "../Utils/functions/utilGetMetaTagsData.tsx";

const PostsWrapper: React.FC<{
  isInFeed: boolean;
  author?: any;
  authorFid?: any;
}> = ({ isInFeed, author, authorFid }) => {
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

    // const res = await apiGetPosts();
    const res = await apiGetCastsForFid(authorFid ? authorFid : "");
    console.log("res in fnGetAllPosts", res);

    setPosts(res?.data);
    updatePostsWithAuthor(res?.data);
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
    setPosts(res?.data?.feed || []);

    setLoading(false);
  };

  // ---- Testing ----
  const fnLoadOgImage = async () => {
    console.log("posts in fnLoadOgImage", posts);
    const res = await apiGetOgs(posts[0]?.embeds[0]?.url);
    console.log("res in fnLoadOgImage", res);
    utilGetMetaTagsData(res?.data);
  };

  const fnLoadPosts = async () => {
    if (isInFeed) {
      fnGetFeed();
    } else {
      fnGetAllPosts();
    }

    fnLoadOgImage();
  };
  useEffect(() => {
    fnLoadPosts();
  }, [isInFeed]);

  return (
    <>
      <div className="">
        {loading && (
          <div>
            {" "}
            <Spin />
          </div>
        )}
        {/* {posts && posts.length === 0 && <div>No Posts Found</div>} */}
        {!posts && !loading && !localStorage.getItem("jwt") && (
          <div>Please Login to View Posts</div>
        )}

        {!loading && posts !== undefined && posts?.length > 0 ? (
          <>
            <InfiniteScroll
              dataLength={posts?.length}
              next={async () => {
                console.log(
                  "Next called, Loading Posts from noOfPosts",
                  noOfPosts
                );
                setNoOfPosts(noOfPosts + 10);
                // fnGetAllPosts();
                await fnLoadPosts();
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
                    postRecasts={item?.reaction?.RECAST}
                    userProfileImage={item?.author?.pfp}
                    userProfileName={item?.author?.name}
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
          !loading && <div className=""> No Posts Found </div>
        )}
      </div>
    </>
  );
};

export default PostsWrapper;
