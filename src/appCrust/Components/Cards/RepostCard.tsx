import React, { useState } from "react";

// import CommentsCard from "../Cards/CommentsCard.tsx";
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
import GrSync from "@meronex/icons/gr/GrSync";

import { Modal } from "antd";

const RepostCard = ({
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
  // const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLikeBtn = () => {
    setIsLike(!isLike);
  };
  const handleCommentBtn = () => {
    setLoading(true);
    setIsCommentsOpen(!isCommentsOpen);

    console.log(loading);
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
  return (
    <>
      {/*<!-- Component: Social story card --> */}
      <div
        // onClick={onClick}
        className="overflow-hidden bg-white text-slate-800 border-y border-slate-200"
      >
        {/*  <!-- Header--> */}
        <div className="px-6 pt-6 flex justify-between align-middle">
          <header className="flex gap-2 align-middle items-center">
            <a
              href="#"
              className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white"
            >
              <img
                src={userProfileImage}
                alt="user name"
                title="user name"
                width="40"
                height="40"
                className="max-w-full rounded-full "
              />
            </a>

      
              <h3 className="text-sm font-medium text-slate-700">
                {userProfileName}
              </h3>
              <p className="text-sm text-slate-400 cursor-pointer"> @{userProfileUsername}</p>

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

        {/* Icons container */}
        <div className="ml-4 mt-2 mb-4 flex gap-2 cursor-pointer">
          <div className="flex ">
            {!isLike ? (
              <div
                onClick={handleLikeBtn}
                className="  mt-2.5 m-2 hover:text-pink-500 selection: text-red-500 "
              >
                <BsHeart size={20} />
              </div>
            ) : (
              <div
                onClick={handleLikeBtn}
                className="  mt-2.5 m-2 hover:text-pink-500 selection: text-pink-500 "
              >
                <BsHeartFill size={20} />
              </div>
            )}
            <div className="ml-0 m-2 text-sm">{postLikes} </div>
          </div>

          <div
            onClick={handleCommentBtn}
            className="m-2  hover:text-pink-500 selection: text-yellow-500"
          >
            <BsChat size={20} />
          </div>
          <div className=" m-2  hover:text-pink-500 selection: text-yellow-500">
            <BsCursor size={20} onClick={showModal} />
          </div>

          <div className=" m-2  hover:text-pink-500 selection: text-yellow-500">
            <GrSync size={20} />
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

    </>
  );
};

export default RepostCard;
