import React, { useEffect, useState } from "react";
import PostDetailsCard from "../Cards/PostDetailsCard.tsx";
import {
  apiGetFeed,
  apiGetPosts,
} from "src/services/BEApis/PostsAPIs/PostsApi.tsx";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const PostsWrapper: React.FC<{ isInFeed: boolean }> = ({ isInFeed }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [noOfPosts, setNoOfPosts] = useState(10);
  const navigate = useNavigate();
  console.log(navigate);

  const fnGetAllPosts = async () => {
    setLoading(true);

    const res = await apiGetPosts();
    console.log("res in fnGetAllPosts", res);

    setPosts(res?.data?.casts);

    setLoading(false);
  };

  const fnGetFeed = async () => {
    setLoading(true);

    const res = await apiGetFeed();
    console.log("res in fnGetFeed", res);
    // --- Working code : Frames ---
    const unsplitPosts = res?.data?.feed.slice(0, noOfPosts);

    const splitStrings = unsplitPosts.map((str: string, index: any) => {
      const indexOfHttps = str.indexOf("https://");

      if (indexOfHttps !== -1) {
        const firstPart = str.substring(0, indexOfHttps);
        const secondPart = str.substring(indexOfHttps);
        return { firstPart, secondPart };
      } else {
        return { firstPart: str, secondPart: "" };
      }
    });

    setPosts(splitStrings);
    setLoading(false);
  };

  useEffect(() => {
    if (isInFeed) {
      fnGetFeed();
    } else {
      fnGetAllPosts();
    }
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
        {posts?.length > 0 && (
          <>
            <InfiniteScroll
              dataLength={posts?.length}
              next={() => {
                console.log(
                  "Next called, Loading Posts from noOfPosts",
                  noOfPosts
                );
                setNoOfPosts(noOfPosts + 10);
                fnGetAllPosts();
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
                    userPostId={item.index}
                    postLikes={item.reactions}
                    userProfileImage={`https://picsum.photos/id/${
                      item.id + 300
                    }/40/40`}
                    userProfileName={"Scripts"}
                    userProfileUsername={`userid${item.index}`}
                    userPostImage={""}
                    // userProfilePostText={item.firstPart + item.secondPart}
                    frameTitle={item.firstPart}
                    frameLink={item.secondPart}
                  />
                );
              })}
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
};

export default PostsWrapper;
