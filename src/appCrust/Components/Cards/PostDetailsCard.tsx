import React, { useEffect, useState } from "react";

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
import SuShuffle from "@meronex/icons/su/SuShuffle";
// // ts-ignore
// import BsBookmark from "@meronex/icons/bs/BsBookmark";

// ts-ignore
import BsArrowRepeat from "@meronex/icons/bs/BsArrowRepeat";

import { Modal, Spin, message } from "antd";
import { Link } from "react-router-dom";
import {
  apiGetPosts,
  apiReactForAPost,
} from "src/services/BEApis/PostsAPIs/PostsApi.tsx";
import NestedPostCard from "./NestedPostCard.tsx";
import SharePostCard from "./SharePostCard.tsx";
import Iframe from "react-iframe";
import { SandboxAttributeValue } from "react-iframe/types";
import { utilFormatPostText } from "src/appCrust/Components/Utils/functions/utilFormatPostText.tsx";
import { apiGetOgs } from "src/services/BEApis/utils/UtilsApis.tsx";
const PostDetailsCard = ({
  postAuthorFid,
  userPostId, //Hash
  userProfileName,
  userProfileUsername,
  userPostImage,
  userProfileImage,
  userProfilePostText,
  userPostTimestamp,
  postLikes,
  postRecasts,
  frameLink,
  frameTitle,
}: // onClick,
PostCardType) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isRecast, setIsRecast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileTeaser, setProfileTeaser] = useState(false);
  const [reactions, setReactions] = useState({
    likes: postLikes,
    recasts: postRecasts,
  });
  // const navigate = useNavigate();

  const handleLikeBtn = () => {
    const likesRes = apiReactForAPost({
      fid: postAuthorFid,
      hash: userPostId,
      reaction: 1,
      type: isLike ? 1 : -1,
    });

    console.log(likesRes);
    setReactions({
      ...reactions,
      likes: postLikes + (isLike ? (postLikes === 0 ? -0 : -1) : +1),
    });
    setIsLike(!isLike);
  };

  const handleCommentBtn = () => {
    setLoading(true);
    setIsCommentsOpen(!isCommentsOpen);

    // userPostId - Fetched from Post Card
    fnLoadNestedPosts(userPostId);
    setLoading(false);
  };

  const handleRecastBtn = () => {
    const recastRes = apiReactForAPost({
      fid: postAuthorFid,
      hash: userPostId,
      reaction: 2,
      type: isLike ? 1 : -1,
    });

    console.log(recastRes);
    setReactions({
      ...reactions,
      recasts: postRecasts + (isRecast ? (postRecasts === 0 ? -0 : -1) : +1),
    });

    !isRecast ? message.success("Recasted") : message.success("Removed Recast");
    setIsRecast(!isRecast);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to Load Nested Posts from Post Card based on userId / username and PostId
  const fnLoadNestedPosts = async (userPostId: any) => {
    console.log("userPostId", userPostId);

    const res = await apiGetPosts();
    console.log(res);
    // setComments(res?.data?.posts.slice(0, 5));
  };

  // OG ----

  const [ogData, setOgData] = useState({
    ogImage: "",
    ogTitle: "",
    ogDescription: "",
    frameImage: "",
    frameButtons: [], // Assuming you want to store button data as well
  });

  const fetchOgData = async (url) => {
    try {
      const response = await apiGetOgs(url); // Fetch page content using your API
      if (response?.data) {
        // Directly access properties from the response
        const {
          "og:image": image,
          "og:title": title,
          "og:description": description,
          "fc:frame:image": frameImage,
        } = response.data;
        let buttons = [];

        // Assuming you want to handle buttons in the response
        for (const key in response.data) {
          if (key.startsWith("fc:frame:button:")) {
            buttons.push(response.data[key]);
          }
        }

        setOgData({
          ogImage: image || "",
          ogTitle: title || "",
          ogDescription: description || "",
          frameImage: frameImage || "",
          frameButtons: buttons,
        });

        console.log("OG data:", ogData);
      }
    } catch (error) {
      console.error("Error fetching OG data:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    if (frameLink) {
      fetchOgData(frameLink);
    }
  }, [frameLink]);

  return (
    <>
      <div className="z-10 overflow-hidden cursor-pointer bg-white  text-slate-800 border-b border-slate-200 hover:bg-slate-50">
        <div className="flex justify-between items-center align-middle mx-4 mt-4 hover:cursor-pointer">
          {/* <header className="flex gap-2 align-middle items-center"> */}
          <div className="flex gap-2 align-middle items-center">
            {/* <Link to={`/profile/${userProfileUsername}`}> */}
            <Link to={`/${postAuthorFid}`}>
              <img
                src={userProfileImage}
                alt="user name"
                title="user name"
                width="40"
                height="40"
                className="max-w-full rounded-full z-10 h-8 w-8 object-cover"
              />{" "}
            </Link>

            <h3 className="text-sm font-medium text-slate-700">
              {userProfileName}
            </h3>
            <Link to={`/${postAuthorFid}`}>
              <p
                onMouseEnter={() => setProfileTeaser(true)}
                // onMouseLeave={() => setProfileTeaser(false)}
                className="text-sm text-slate-400 cursor-pointer hover:underline"
              >
                {" "}
                @{userProfileUsername}
              </p>
            </Link>
          </div>

          {/* <div className="text-sm text-slate-600"> 2 hours ago </div> */}
          <div className="text-sm text-slate-600"> {userPostTimestamp} </div>
          {/* </header> */}
        </div>

        <Link to={`/${postAuthorFid}/${userPostId}`} color="#000">
          <div className="m-4 pb-0">
            {userProfilePostText && (
              <p>{utilFormatPostText(userProfilePostText)}</p>
            )}

            {/* {frameLink && (
              <div className="w-full h-[400px] border rounded-md mt-2">
                <Iframe
                  allow="autoplay"
                  sandbox={
                    "allow-same-origin allow-scripts allow-scripts" as SandboxAttributeValue
                  }
                  url={frameLink}
                  // width={"100%"}
                  // height="320px"
                  className="w-full h-auto md:h-80"
                  frameBorder={0}
                  scrolling="no"
                  loading="lazy"
                  // display="block"
                  // position="relative"
                />
              </div>
            )} */}
          </div>

          {userPostImage && (
            <div className="mt-2">
              <img
                src={userPostImage}
                alt="card image"
                className="aspect-video w-full p-4"
              />
            </div>
          )}

          {ogData?.ogImage && (
            <div className="my-4 mx-4 border rounded-md">
              <img
                src={ogData?.ogImage}
                alt="card image"
                className="aspect-video w-full p-2 rounded-md"
              />
            </div>
          )}
        </Link>

        {/* Icons container */}
        <div className="m-2 flex flex-row justify-between gap-2 cursor-pointer hover:cursor-pointer">
          <div className="flex align-middle justify-between items-center align-middle">
            {/* <div className=""> */}
              {!isLike ? (
                <div
                  onClick={handleLikeBtn}
                  // className="cursor-pointer  m-2 rounded-full hover:bg-red-100 selection: text-red-400 "
                  className="cursor-pointer  m-2 rounded-full hover:bg-yellow-100 selection: text-yellow-500 "
                >
                  <BsHeart size={20} />
                </div>
              ) : (
                <div
                  onClick={handleLikeBtn}
                  // className="cursor-pointer  m-2 rounded-full hover:bg-red-100 selection:bg-red-100 text-red-400"
                  className="cursor-pointer  m-2 rounded-full hover:bg-yellow-100 selection:bg-yellow-100 text-yellow-500"
                >
                  <BsHeartFill size={20} />
                </div>
              )}
              <div className="cursor-pointer ml-0.5 text-sm">{reactions.likes} </div>
            {/* </div> */}

            {/* <div
              onClick={handleCommentBtn}
              className=" cursor-pointer m-2 p-2  rounded-full  hover:bg-yellow-50 selection: text-yellow-500"
            >
              <BsChat size={20} />
            </div> */}

            {/* <div className=" cursor-pointer m-2 p-2  rounded-full  hover:bg-yellow-50 selection: text-yellow-500">
              <BsCollection size={20} />
            </div> */}

            {/* <div className="cursor-pointer mt-2.5 m-2 p-2 rounded-full hover:bg-yellow-50 selection:text-yellow-500"> */}
            <div
              onClick={handleRecastBtn}
              className="cursor-pointer m-2 ml-4 rounded-full hover:bg-yellow-100 selection: text-yellow-500"
            >
              <BsArrowRepeat
                // style={{ color: "#CC9999" }}
                size={24}
                // className="text-yellow-500!important "
              />
            </div>
            <div className="cursor-pointer ml-0.5 text-sm">{reactions.recasts} </div>
          </div>
          <div className="flex">
            {/* <div className="cursor-pointer m-2 p-2 rounded-full hover:bg-yellow-50 selection: text-yellow-500">
              <BsBookmark
                size={20}
                onClick={() => message.success("Added to bookmarks")}
              />
            </div> */}

            <div className="cursor-pointer m-2 rounded-full hover:bg-yellow-100 selection: text-yellow-500">
              <BsCursor size={20} onClick={showModal} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        okText="Share"
        title="Share this Post"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <SharePostCard
          userPostId={userPostId}
          userProfilePostText={userProfilePostText}
          userPostImage={userPostImage}
          postAuthorFid={postAuthorFid}
          frameLink={ogData?.ogImage}
        />
      </Modal>
      {loading && <Spin />}
      {isCommentsOpen ? (
        <>
          {" "}
          {comments?.length > 0 && (
            <div className="">
              {comments?.map((comment: any) => (
                // <CommentsCard
                //   commentUserImage={`https://picsum.photos/id/${comment?.id}/40/40`}
                //   commentAction={"Replied"}
                //   commentUser={comment?.user?.username}
                //   commentTimeStamp={"2 hours ago"}
                //   commentText={comment?.body}
                //   commentUsername={comment?.userProfileUsername}
                // />

                <NestedPostCard
                  key={comment.id}
                  userPostId={comment.id}
                  postLikes={comment.reactions}
                  userProfileImage={`https://picsum.photos/id/${
                    comment.id + 300
                  }/40/40`}
                  userProfileName={"Scripts"}
                  userProfileUsername={`userid${comment.userId}`}
                  userPostImage={`https://picsum.photos/id/${
                    comment.id + 300
                  }/800/600`}
                  userProfilePostText={comment.body}
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
