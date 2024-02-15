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
  const { jwt } = useUser();

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
    setPosts(res?.data?.feed || []);

    setLoading(false);
  };

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
              loader={<Spin />}
              scrollableTarget="InfScrolltarget"
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
