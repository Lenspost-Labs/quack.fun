import React, { useEffect, useState } from "react";
import CommentsCard from "../Cards/CommentsCard";
import { apiGetComments } from "src/services/BEApis/PostsAPIs/CommentsApi";
import { Spin } from "antd";

const CommentsWrapper = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fnLoadComments = async (limit: number) => {
    setLoading(true);
    // const res = await apiGetComments();
    // console.log(res);
    // setComments(res?.data?.comments.slice(0, limit));
    setLoading(false);
  };

  useEffect(() => {
    fnLoadComments(10);
  }, []);

  return (
    <>
      <div className="">
        {loading && <Spin />}
        {comments?.length > 0 && (
          <div className="">
            {comments?.map((comment: any) => (
              <CommentsCard
                commentUserImage={`https://picsum.photos/id/${comment?.id}/40/40`}
                commentAction={"Replied"}
                commentUser={comment?.user?.username}
                commentTimeStamp={"2 hours ago"}
                commentText={comment?.body}
                commentUsername={comment?.userProfileUsername}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentsWrapper;
