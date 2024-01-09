import { Button, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { utilCopyToClip } from "../Utils/utilCopyToClip";
import XLogo from "../../../assets/Logos/logoX.jpeg";
import TgLogo from "../../../assets/Logos/logoTg.png";

const SharePostCard = ({
  userPostId,
  userProfilePostText,
  userPostImage,
}: any) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  return (
    <>
      {userProfilePostText}
      <br />
      <img
        src={userPostImage}
        alt="card image"
        className="aspect-video h-32 w-fit p-4 pl-0"
      />
      <div className="flex justify-between">
        <Link to={`/post/${userPostId}`}>
          {" "}
          {`${BACKEND_URL}/post/${userPostId}`}{" "}
        </Link>
        <Button
          type="primary"
          onClick={() => utilCopyToClip(`${BACKEND_URL}/post/${userPostId}`)}
        >
          Copy Link
        </Button>
      </div>
      <Divider />
      <div className="flex justify-between align-middle items-center ">
        <div className=""> Share to Other Socials </div>
        <div className="m-2 flex gap-4">
          {/* Telegram share backlink to post */}
          <a
            href={`https://telegram.me/share/url?url=${BACKEND_URL}/post/${userPostId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={TgLogo}
              className=" cursor-pointer rounded-full w-12 h-12"
              alt=""
            />
          </a>
          {/* Twitter share backlink to post */}
          <a
            href={`https://twitter.com/intent/tweet?text=${BACKEND_URL}/post/${userPostId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={XLogo}
              className=" cursor-pointer rounded-full w-12 h-12"
              alt=""
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default SharePostCard;
