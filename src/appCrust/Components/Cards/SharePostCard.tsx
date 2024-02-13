import { Button, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { utilCopyToClip } from "../Utils/functions/utilCopyToClip";
import XLogo from "../../../assets/Logos/logoX.jpeg";
import TgLogo from "../../../assets/Logos/logoTg.png";

const SharePostCard = ({
  userPostId,
  userProfilePostText,
  userPostImage,
  postAuthorFid,
}: any) => {
  // const BASE_URL = import.meta.env.BASE_URL;
  const BASE_URL = "http://quack.fun";

  return (
    <>
      {userProfilePostText}
      <br />
      {userPostImage && (
        <img
          src={userPostImage}
          alt="card image"
          className="aspect-video h-32 w-fit p-4 pl-0"
        />
      )}
      <div className="flex flex-col">
        <Link to={`/${postAuthorFid}/${userPostId}`}>
          {" "}
          <div className="truncate">
            {`${BASE_URL}/${postAuthorFid}/${userPostId}`}{" "}
          </div>
        </Link>
        {/* <Button
          className="m-2 mb-0"
          type="primary"
          onClick={() =>
            utilCopyToClip(`${BASE_URL}/${postAuthorFid}/${userPostId}`)
          }
        >
          Copy Link
        </Button> */}
      </div>
      <Divider />
      <div className="flex justify-between align-middle items-center ">
        <div className=""> Share to Other Socials </div>
        <div className="m-2 flex gap-4">
          <Button
            className="m-2 mb-0"
            type="primary"
            onClick={() =>
              utilCopyToClip(`${BASE_URL}/${postAuthorFid}/${userPostId}`)
            }
          >
            Copy Link
          </Button>
          {/* Telegram share backlink to post */}
          <a
            href={`https://telegram.me/share/url?url=${BASE_URL}/${postAuthorFid}/${userPostId}`}
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
            href={`https://twitter.com/intent/tweet?text=${BASE_URL}/${postAuthorFid}/${userPostId}`}
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
