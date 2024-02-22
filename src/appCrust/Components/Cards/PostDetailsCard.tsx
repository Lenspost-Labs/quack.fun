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
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Button, Modal, Spin, message } from "antd";
import { Link } from "react-router-dom";
import {
  apiActOnAPost,
  apiGetPosts,
  apiReactForAPost,
} from "src/services/BEApis/PostsAPIs/PostsApi.tsx";
import NestedPostCard from "./NestedPostCard.tsx";
import SharePostCard from "./SharePostCard.tsx";
import Iframe from "react-iframe";
import { SandboxAttributeValue } from "react-iframe/types";
import { utilFormatPostText } from "src/appCrust/Components/Utils/functions/utilFormatPostText.tsx";
import { apiGetOgs } from "src/services/BEApis/utils/UtilsApis.tsx";

import BiLinkExternal from "@meronex/icons/bi/BiLinkExternal";
import axios from "axios";
import { apiGetComments } from "src/services/BEApis/PostsAPIs/CommentsApi.tsx";

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
  const [comments, setComments] = useState([
    {
      commentUserImage: "",
      commentAction: "",
      commentUser: "",
      commentTimeStamp: "",
      commentText: "",
      commentUsername: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [profileTeaser, setProfileTeaser] = useState(false);
  const [reactions, setReactions] = useState({
    likes: postLikes,
    recasts: postRecasts,
  });
  // OG -------------------
  const [ogData, setOgData] = useState({
    ogImage: "",
    ogTitle: "",
    ogDescription: "",
    frameImage: "",
    frameButtons: [],
  });

  const [metadata, setMetadata] = useState<any>({
    fcFrame: "",
    frameImage: "",
    ogImage: "",
    ogTitle: "",
    ogDescription: "",
    frameButton1: "",
    frameButton1Action: "post", // Default action is 'post'
    frameButton1Target: "",
    frameButton2: "",
    frameButton2Action: "post", // Default action is 'post'
    frameButton2Target: "",
    frameButton3: "",
    frameButton3Action: "post", // Default action is 'post'
    frameButton3Target: "",
    frameButton4: "",
    frameButton4Action: "post", // Default action is 'post'
    frameButton4Target: "",
    framePostUrl: "",
    frameInputText: "",
    frameImageAspectRatio: "1.91:1", // Default aspect ratio is '1.91:1'
  });

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
    console.log("postAuthorFid", postAuthorFid);

    const res = await apiGetComments({
      fid: postAuthorFid,
      hash: userPostId,
    });
    console.log(res);
    // setComments(res?.data?.posts.slice(0, 5));
  };

  useEffect(() => {
    const fetchDataAndSetMetadata = async () => {
      try {
        const response = await apiGetOgs(frameLink);

        if (response?.data) {
          const {
            "og:image": ogImage,
            "og:title": ogTitle,
            "og:description": ogDescription,
            "fc:frame": fcFrame,
            "fc:frame:image": frameImage,
            "fc:frame:image:aspect_ratio": frameImageAspectRatio,
            "fc:frame:post_url": framePostUrl,
            "fc:frame:button:1": frameButton1,
            "fc:frame:button:2": frameButton2,
            "fc:frame:button:3": frameButton3,
            "fc:frame:button:4": frameButton4,
            "fc:frame:button:1:action": frameButton1Action,
            "fc:frame:button:1:target": frameButton1Target,
            "fc:frame:button:2:action": frameButton2Action,
            "fc:frame:button:2:target": frameButton2Target,
            "fc:frame:button:3:action": frameButton3Action,
            "fc:frame:button:3:target": frameButton3Target,
            "fc:frame:button:4:action": frameButton4Action,
            "fc:frame:button:4:target": frameButton4Target,
          } = response.data;

          setMetadata({
            ogImage,
            ogTitle,
            ogDescription,
            frameImage,
            frameImageAspectRatio,
            fcFrame,
            frameButton1,
            frameButton1Action,
            frameButton1Target,
            frameButton2,
            frameButton2Action,
            frameButton2Target,
            frameButton3,
            frameButton3Action,
            frameButton3Target,
            frameButton4,
            frameButton4Action,
            frameButton4Target,
            framePostUrl,
            frameInputText: "",
          });
        }
      } catch (error) {
        console.error("Error fetching OG data:", error);
        // Handle error appropriately
      }
    };

    fetchDataAndSetMetadata();
  }, [frameLink]);

  /**
   * Handle button click event
   * @param evt - The click event
   * @param btnAction - Specifies if the button action is post_redirect or link
   * @param index - The index of the button
   * @returns void
   */
  const handleButtonClick = async (
    evt: React.MouseEvent,
    btnAction: "post_redirect" | "link",
    index: number
  ): Promise<void> => {
    evt.preventDefault();
    message.loading("Frame Action in Progress");
    try {
      if (btnAction === "post_redirect" || btnAction === "link") {
        window.open(frameLink, "_blank");
        return;
      }
      const btnHitRes = await apiActOnAPost({
        hash: userPostId,
        fid: postAuthorFid,
        buttonIndex: index,
        url: frameLink,
      });

      console.log("btnHitRes", btnHitRes);
      message.loading("Frame Action in Progress");
      // Assuming btnHitRes is HTML response, parse it to extract meta tags
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(
        btnHitRes?.data?.data,
        "text/html"
      );

      // Extract meta tags from the parsed HTML
      const metaTags = Array.from(htmlDoc.querySelectorAll("meta")).reduce(
        (acc, meta) => {
          acc[meta.getAttribute("name") || meta.getAttribute("property")] =
            meta.getAttribute("content");
          return acc;
        },
        {}
      );

      // Set metadata based on the extracted meta tags
      setMetadata({
        fcFrame: metaTags["fc:frame"] || "",
        frameImage: metaTags["fc:frame:image"] || metaTags["og:image"] || "",
        ogImage: metaTags["og:image"] || "",
        ogTitle: metaTags["og:title"] || "",
        ogDescription: metaTags["og:description"] || "",
        frameButton1: metaTags["fc:frame:button:1"] || "",
        frameButton1Action: metaTags["fc:frame:button:1:action"] || "post",
        frameButton1Target: metaTags["fc:frame:button:1:target"] || "",
        frameButton2: "", // Add the missing property with an initial value
        frameButton2Action: "", // Add the missing property with an initial value
        frameButton2Target: "", // Add the missing property with an initial value
        frameButton3: "", // Add the missing property with an initial value
        // Add the other missing properties here
      });

      console.log("btnHitRes", btnHitRes);
      message.destroy();
      if (btnHitRes?.data?.message) {
        message.success(btnHitRes?.data?.message);
      } else {
        message.info("Frame Action Error");
      }
    } catch (error) {
      console.error("Error handling button click:", error);
      message.destroy();
      message.error("Frame Action Error");
      // Handle error appropriately
    }
  };

  useEffect(() => {
    // Clear existing meta tags in the head
    document.head
      .querySelectorAll('meta[name^="og:"], meta[name^="fc:"]')
      .forEach((meta) => {
        meta.remove();
      });

    // Create and append new meta tags
    const metaTags = [
      { name: "og:title", content: metadata.ogTitle },
      { name: "og:description", content: metadata.ogDescription },
      { name: "og:image", content: metadata.ogImage || metadata.frameImage },
      { property: "fc:frame", content: metadata.fcFrame },
      { property: "fc:frame:image", content: metadata.frameImage },
      { property: "fc:frame:post_url", content: metadata.framePostUrl },
      { property: "fc:frame:input:text", content: metadata.frameInputText },
      {
        property: "fc:frame:image:aspect_ratio",
        content: metadata.frameImageAspectRatio || "1.91:1",
      },
      { property: "fc:frame:button:1", content: metadata.frameButton1 },
      {
        property: "fc:frame:button:1:action",
        content: metadata.frameButton1Action,
      },
      {
        property: "fc:frame:button:1:target",
        content: metadata.frameButton1Target,
      },
      { property: "fc:frame:button:2", content: metadata.frameButton2 },
      {
        property: "fc:frame:button:2:action",
        content: metadata.frameButton2Action,
      },
      {
        property: "fc:frame:button:2:target",
        content: metadata.frameButton2Target,
      },
      { property: "fc:frame:button:3", content: metadata.frameButton3 },
      {
        property: "fc:frame:button:3:action",
        content: metadata.frameButton3Action,
      },
      {
        property: "fc:frame:button:3:target",
        content: metadata.frameButton3Target,
      },
      { property: "fc:frame:button:4", content: metadata.frameButton4 },
      {
        property: "fc:frame:button:4:action",
        content: metadata.frameButton4Action,
      },
      {
        property: "fc:frame:button:4:target",
        content: metadata.frameButton4Target,
      },
    ];

    console.log("metaTags", metaTags);

    metaTags.forEach((meta) => {
      const metaTag = document.createElement("meta");
      metaTag.name = meta.name;
      metaTag.setAttribute("property", meta.property); // Fix: Use setAttribute to set the 'property' attribute
      metaTag.content = meta.content;
      document.head.appendChild(metaTag);
    });
  }, [metadata]);

  return (
    <>
      <div className="z-10 overflow-hidden cursor-pointer bg-white  text-slate-800 border-b border-slate-200 hover:bg-slate-50">
        <div className="flex justify-between items-center align-middle mx-4 mt-4 hover:cursor-pointer">
          {/* <header className="flex gap-2 align-middle items-center"> */}
          <div className="flex gap-2 align-middle items-center">
            {/* <Link to={`/profile/${userProfileUsername}`}> */}
            <Link to={`/${postAuthorFid}`}>
              <LazyLoadImage
                src={userProfileImage}
                alt="user name"
                title="user name"
                width="40"
                height="40"
                className="max-w-full rounded-full z-10 h-8 w-8 object-cover"
                effect="blur"
              />
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
          </div>

          {/* -- Profile details -- */}
          <div className="m-2 border rounded-md p-2">
            <LazyLoadImage
              src={metadata.ogImage || metadata.frameImage}
              alt={metadata.ogTitle}
              className={`w-full p-2 rounded-md aspect-${
                metadata.frameImageAspectRatio || "1.91:1"
              }`}
            />
            <h1 className="m-2 border px-2 p-1 text-sm w-fit rounded-md">
              {metadata.ogTitle}
            </h1>

            {/* Render input field if present */}
            {metadata.frameInputText && (
              <input type="text" placeholder={metadata.frameInputText} />
            )}

            <div className="flex gap-2 p-2 w-full">
              {[1, 2, 3, 4].map((index) => {
                const buttonData = metadata[`frameButton${index}`];
                return (
                  buttonData && (
                    <Button
                      icon={
                        metadata[`frameButton${index}Action`] ===
                          "post_redirect" ||
                        metadata[`frameButton${index}Action`] === "link" ? (
                          <BiLinkExternal size={12} className="pt-0.5" />
                        ) : null
                      }
                      className="w-full"
                      onClick={(evt) =>
                        handleButtonClick(
                          evt,
                          metadata[`frameButton${index}Action`],
                          index
                        )
                      }
                    >
                      {buttonData}
                    </Button>
                  )
                );
              })}
            </div>
          </div>
        </Link>
        {userPostImage && (
          <div className="mt-2">
            <LazyLoadImage
              src={userPostImage}
              alt={userProfileName}
              title={userProfileName}
              // className="max-w-full rounded-full z-10 h-8 w-8 object-cover"
              className="aspect-video w-full p-4"
              effect="blur"
            />
          </div>
        )}
        {/* Icons container */}
        <div className="m-2 flex flex-row justify-between gap-2 cursor-pointer hover:cursor-pointer">
          <div className="flex align-middle justify-between items-center">
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
            <div className="cursor-pointer ml-0.5 text-sm">
              {reactions.likes}{" "}
            </div>
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
            <div className="cursor-pointer ml-0.5 text-sm">
              {reactions.recasts}{" "}
            </div>
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
