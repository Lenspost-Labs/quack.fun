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
import { Modal } from "antd";

const PostDetailsCard = ({
  userProfileName,
  userProfileUsername,
  userPostImage,
  userProfileImage,
  userProfilePostText,
}: // onClick,
PostCardType) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLikeBtn = () => {
    setIsLike(!isLike);
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
        className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 m-2"
      >
        {/*  <!-- Header--> */}
        <div className="px-6 pt-6">
          <header className="flex gap-2">
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
            <div>
              <h3 className="text-sm font-medium text-slate-700">
                {userProfileName}
              </h3>
              <p className="text-sm text-slate-400"> @{userProfileUsername}</p>
            </div>
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
        <div className="ml-4 mt-2 mb-4 flex cursor-pointer">
          <div className="flex ">
            {isLike ? (
              <div
                onClick={handleLikeBtn}
                className="  mt-2.5 m-2 hover:text-emerald-500 shadow-sm selection: text-red-500 "
              >
                <BsHeart />
              </div>
            ) : (
              <div
                onClick={handleLikeBtn}
                className="  mt-2.5 m-2 hover:text-emerald-500 shadow-sm selection: text-pink-500 "
              >
                <BsHeartFill />
              </div>
            )}
            <div className="ml-0 m-2 text-sm">100+ </div>
          </div>

          <div
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="m-2  hover:text-emerald-500 shadow-sm selection: text-blue-500"
          >
            <BsChat />
          </div>
          <div className=" m-2  hover:text-emerald-500 shadow-sm selection: text-yellow-500">
            <BsCursor onClick={showModal} />
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
          <div className="m-2">
            <CommentsCard
              commentUserImage={"https://picsum.photos/id/183/40/40"}
              commentAction={"Commented"}
              commentUser={"Aryan Ag"}
              commentTimeStamp={"2 hours ago"}
              commentText="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              commentUsername={"useraryanag"}
            />
            <CommentsCard
              commentUserImage={"https://picsum.photos/id/185/40/40"}
              commentAction={"Replied to a comment"}
              commentUser={"Sudeep S"}
              commentTimeStamp={"12 minutes ago"}
              commentText="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              commentUsername={"usersudeeeps"}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PostDetailsCard;
