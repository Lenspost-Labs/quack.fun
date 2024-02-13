import React, { useEffect, useState } from "react";
import { apiGetPosts } from "src/services/BEApis/PostsAPIs/PostsApi.tsx";
import { Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import NestedPostCard from "../Cards/NestedPostCard.tsx";

const NestedPostsWrapper: React.FC<any> = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [noOfPosts, setNoOfPosts] = useState(10);

  const fnGetAllNestedPosts = async () => {
    setLoading(true);

    const res = await apiGetPosts();
    console.log("res in fnGetAllNestedPosts", res);

    setPosts(res?.data?.posts.slice(0, noOfPosts));

    setLoading(false);
  };

  useEffect(() => {
    // fnGetAllNestedPosts();
  }, [noOfPosts]);



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
                fnGetAllNestedPosts();
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
              {posts?.map((item) => {
                return (
                  <>
                    <NestedPostCard
                      key={item.id}
                      userPostId={item.id}
                      postLikes={item.reactions}
                      userProfileImage={`https://picsum.photos/id/${
                        item.id + 300
                      }/40/40`}
                      userProfileName={"Scripts"}
                      userProfileUsername={`userid${item.userId}`}
                      userPostImage={`https://picsum.photos/id/${
                        item.id + 300
                      }/800/600`}
                      userProfilePostText={item.body}
                    />
                  </>
                );
              })}
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
};

export default NestedPostsWrapper;
