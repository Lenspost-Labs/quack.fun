import React from "react";
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

import { Link } from "react-router-dom";

const NestedPostCard = ({
  userPostId,
  userProfileName,
  userProfileUsername,
  // userPostImage,
  userProfileImage,
  userProfilePostText,
}: // onClick,
PostCardType) => {
  //   const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  return (
    <>
      {" "}
      <ul
        aria-label="Nested user feed"
        role="feed"
        className="mt-0.5 bg-white relative flex flex-col cursor-pointer gap-16 py-6  hover:bg-slate-50 before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 "
      >
        <li role="article" className="relative pl-2 z-50 ">
          <div className="overflow-hidden cursor-pointer">
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
          <Link to={`/post/${userPostId}`} color="#000">
            <div className="px-2 pl-12 pb-0">
              <p>{userProfilePostText}</p>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NestedPostCard;
