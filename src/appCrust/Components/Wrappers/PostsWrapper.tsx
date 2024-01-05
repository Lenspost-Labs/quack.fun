import React, { useEffect, useState } from "react";
import PostDetailsCard from "../Cards/PostDetailsCard.tsx";
import { apiGetPosts } from "src/services/BEApis/PostsAPIs/PostsApi.tsx";
import { Spin } from "antd";
// import { useNavigate } from "react-router-dom";

// https://ahooks.js.org/hooks/use-infinite-scroll
const PostsWrapper: React.FC<any> = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  // Data Pattern : 
  //   {
  //     userpostId: 1,
  //     userProfileImage: "https://picsum.photos/id/146/40/40",
  //     userPostImage: "https://picsum.photos/id/146/800/600",
  //     userProfileName: "Scripts",
  //     userProfileUsername: "scriptscrypt",
  //     userProfilePostText:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },

  const fnGetAllPosts = async () => {
    setLoading(true);

    const res = await apiGetPosts();
    console.log(res);
    setPosts(res?.data?.posts);

    console.log(posts);

    setLoading(false);
  };

  useEffect(() => {
    fnGetAllPosts();
  }, []);


  return (
    <>
      <div className="">
        {loading && <div> <Spin /></div>}
        {posts?.length > 0 && (
          <>
            {posts?.map((item) => {
              return (
                <PostDetailsCard
                  key={item.id}
                  // onClick={() => {
                  //   navigate(`/post/${item.userpostId}`);
                  // }}
                  postLikes={item.reactions}
                  userProfileImage={`https://picsum.photos/id/${item.id+300}/40/40`}
                  userProfileName={"Scripts"}
                  userProfileUsername={`userid${item.userId}`}
                  userPostImage={`https://picsum.photos/id/${item.id+300}/800/600`}
                  userProfilePostText={item.body}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default PostsWrapper;
