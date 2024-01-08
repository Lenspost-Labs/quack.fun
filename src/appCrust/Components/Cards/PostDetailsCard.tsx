import React, { useState } from "react";

import CommentsCard from "../Cards/CommentsCard.tsx";
// @ts-ignore
import BsHeart from "@meronex/icons/bs/BsHeart";
// @ts-ignore
import BsChat from "@meronex/icons/bs/BsChat";
// @ts-ignore
import BsCursor from "@meronex/icons/bs/BsCursor";
// @ts-ignore
import BsHeartFill from "@meronex/icons/bs/BsHeartFill";
// @ts-ignore
import BsCollection from "@meronex/icons/bs/BsCollection";
// @ts-ignore
import ZoRepost from "@meronex/icons/zo/ZoRepost";

import { Modal, Spin } from "antd";
import { apiGetComments } from "src/services/BEApis/PostsAPIs/CommentsApi.tsx";
import { Link } from "react-router-dom";

const PostDetailsCard = ({
  userPostId,
  userProfileName,
  userProfileUsername,
  userPostImage,
  userProfileImage,
  userProfilePostText,
  postLikes,
}: // onClick,
PostCardType) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLikeBtn = () => {
    setIsLike(!isLike);
  };
  const handleCommentBtn = () => {
    setLoading(true);
    setIsCommentsOpen(!isCommentsOpen);

    // userPostId - Fetched from Post Card
    fnLoadComments(userPostId);
    setLoading(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fnLoadComments = async (userPostId: any) => {
    console.log("userPostId", userPostId);

    const res = await apiGetComments();
    console.log(res);
    setComments(res?.data?.comments.slice(0, 5));
  };

  return (
    <>
      <div className="overflow-hidden cursor-pointer bg-white  text-slate-800 border-b border-slate-200 hover:bg-slate-50">
        <Link to={`/post/${userPostId}`}>
          <div className="px-6 pt-6 flex justify-between align-middle">
            <header className="flex gap-2 align-middle items-center">
              <Link to={`/profile/${userProfileUsername}`}>
                <img
                  src={userProfileImage}
                  alt="user name"
                  title="user name"
                  width="40"
                  height="40"
                  className="max-w-full rounded-full "
                />{" "}
              </Link>

              <h3 className="text-sm font-medium text-slate-700">
                {userProfileName}
              </h3>
              <Link to={`/profile/${userProfileUsername}`}>
                <p className="text-sm text-slate-400 cursor-pointer hover:underline">
                  {" "}
                  @{userProfileUsername}
                </p>
              </Link>

              <div className="text-sm text-slate-600"> 2 hours ago </div>
            </header>
          </div>

          <div className="p-6 pb-0">
            <p>{userProfilePostText}</p>
          </div>

          <div>
            <img
              src={userPostImage}
              alt="card image"
              className="aspect-video w-full p-4"
            />
          </div>
        </Link>

        {/* Icons container */}
        <div className="ml-4 mt-2 mb-4 flex flex-row justify-between gap-2 cursor-pointer">
          <div className="flex align-middle justify-between">
            <div className="flex">
              {!isLike ? (
                <div
                  onClick={handleLikeBtn}
                  className="  mt-2.5 m-2 p-2  rounded-full hover:bg-red-50 selection: text-red-400 "
                >
                  <BsHeart size={20} />
                </div>
              ) : (
                <div
                  onClick={handleLikeBtn}
                  className="  mt-2.5 m-2 p-2  rounded-full hover:bg-red-50 selection:bg-red-100 text-red-400"
                >
                  <BsHeartFill size={20} />
                </div>
              )}
              <div className="ml-0 m-2 p-2 text-sm">{postLikes} </div>
            </div>

            <div
              onClick={handleCommentBtn}
              className="m-2 p-2  rounded-full  hover:bg-yellow-50 selection: text-yellow-500"
            >
              <BsChat size={20} />
            </div>

            <div className=" m-2 p-2   rounded-full  hover:bg-yellow-50 selection: text-yellow-500">
              <ZoRepost size={24} className="" />
            </div>
          </div>
          <div className="m-2 mr-5 p-2   rounded-full  hover:bg-yellow-50 selection: text-yellow-500">
            <BsCursor size={20} onClick={showModal} />
          </div>
        </div>
      </div>

      <Modal
        centered
        okText="Share"
        title="Share this Post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {userProfilePostText}
      </Modal>

      {isCommentsOpen ? (
        <>
          {" "}
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
          {/* <Button onClick={handleCommentBtn()}>View all comments</Button> */}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PostDetailsCard;
