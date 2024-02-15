import React, { useEffect, useState } from "react";
import PostDetailsCard from "../Cards/PostDetailsCard.tsx";
import {
  apiGetCastsForFid,
  apiGetFeed,
  apiGetPosts,
} from "src/services/BEApis/PostsAPIs/PostsApi.tsx";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { utilXtimeAgo } from "../Utils/functions/utilXtimeAgo.tsx";
import { apiGetOgs } from "src/services/BEApis/utils/UtilsApis.tsx";
import { utilGetMetaTagsData } from "../Utils/functions/utilGetMetaTagsData.tsx";
import MdRefresh from "@meronex/icons/ios/MdRefresh";
import useUser from "src/hooks/userHooks/useUser.tsx";

const PostsWrapper: React.FC<{
  isInFeed: boolean;
  author?: any;
  authorFid?: any;
}> = ({ isInFeed, author, authorFid }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [noOfPosts, setNoOfPosts] = useState(10);
  const [infCursor, setInfCursor] = useState("");
  const { jwt } = useUser();

  const updatePostsWithAuthor = (newPosts: any[]) => {
    const updatedPosts = newPosts.map((post) => ({
      ...post,
      author: { ...author },
    }));
    // setPosts(updatedPosts);
    return updatedPosts;

    // setPosts((prevPosts) => {
    //   // const newPosts = updatedPosts || [];
    //   const updatedPosts = newPosts.filter(
    //     (newPost) =>
    //       !prevPosts.some((prevPost) => prevPost.hash === newPost.hash)
    //   );
    //   return [...prevPosts, ...updatedPosts];
    // });

    // console.log("updated posts", updatedPosts);
  };

  const fnGetAllPosts = async () => {
    setLoading(true);

    // const res = await apiGetPosts();
    const res = await apiGetCastsForFid(authorFid ? authorFid : "");
    console.log("res in fnGetAllPosts", res);

    // setPosts(res?.data);
    const updatedPosts = updatePostsWithAuthor(res?.data);
    setLoading(false);
    return updatedPosts;
  };

  const fnGetFeed = async () => {
    setLoading(true);

    const res = await apiGetFeed(infCursor);
    console.log("res in fnGetFeed", res);
    // setPosts(res?.data?.feed || []);

    // setPosts((prevPosts) => {
    //   const newPosts = res?.data?.feed || [];
    //   const updatedPosts = newPosts.filter(
    //     (newPost) =>
    //       !prevPosts.some((prevPost) => prevPost.hash === newPost.hash)
    //   );
    //   return [...prevPosts, ...updatedPosts];
    // });

    setInfCursor(res?.data?.cursor);
    setLoading(false);
    return res?.data?.feed || [];
  };

  // const fnLoadOgImage = async () => {
  //   console.log("posts in fnLoadOgImage", posts);
  //   const res = await apiGetOgs(posts[0]?.embeds[0]?.url);
  //   console.log("res in fnLoadOgImage", res);
  //   utilGetMetaTagsData(res?.data);
  // };

  const fnLoadPosts = async () => {
    let newPosts;
    if (isInFeed) {
      newPosts = await fnGetFeed();
    } else {
      newPosts = await fnGetAllPosts();
    }

    // Append the new posts to the existing ones
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  };

  useEffect(() => {
    fnLoadPosts();
  }, [isInFeed, noOfPosts, authorFid, author]);

  useEffect(() => {
    fnLoadPosts();
  }, [noOfPosts]);

  useEffect(() => {
    console.log("posts in useEffect", posts);
  }, [infCursor]);

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
            {/* <div id="infScrolltarget" style={{ height: 300, overflow: "auto" }}> */}
            <InfiniteScroll
              dataLength={posts?.length}
              next={() => {
                console.log(
                  "Next called, Loading Posts from noOfPosts",
                  noOfPosts
                );
                setNoOfPosts(noOfPosts + 10);
                // fnGetAllPosts();
                // fnLoadPosts();
                // setPosts();
              }}
              scrollThreshold={0.9}
              hasMore={true}
              loader={<Spin />}
              scrollableTarget="infScrolltarget"
              endMessage={<b>Yay! You have seen it all</b>}
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
            {/* </div> */}
          </>
        ) : (
          !loading && (
            <>
              <div className="flex flex-col justify-center align-middle items-center">
                {jwt && (
                  <>
                    <div className=""> No Posts Found </div>
                    <div className="mt-2">
                      <Button
                        type="default"
                        icon={<MdRefresh size={24} />}
                        onClick={() => fnLoadPosts()}
                      ></Button>{" "}
                    </div>
                  </>
                )}

                {!jwt && (
                  <>
                    <div className=""> Please Login to View Posts </div>
                  </>
                )}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default PostsWrapper;
