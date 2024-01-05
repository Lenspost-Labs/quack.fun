import React from "react";
const CommentsCard = ({
  commentText,
  commentUser,
  commentUserImage,
  commentTimeStamp,
  commentAction,
}: CommentType) => {
  return (
    <>
      <ul
        aria-label="Nested user feed"
        role="feed"
        className="bg-white relative flex flex-col cursor-pointer gap-16 py-12 pl-6 hover:bg-slate-50 before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 "
      >
        <li role="article" className="relative pl-6 ">
          <div className="flex flex-col flex-1 gap-2">
            <a
              href="#"
              className="absolute z-10 inline-flex items-center justify-center w-6 h-6 text-white rounded-full -left-3 ring-2 ring-white"
            >
              <img
                src={commentUserImage}
                alt="user name"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </a>
            <h4 className="flex flex-col items-start text-base font-medium leading-6 text-slate-700 md:flex-row lg:items-center">
              <span className="flex-1">
                {commentUser}{" "}
                <span className="text-sm font-normal text-slate-500">
                  {" "}
                  {commentAction}{" "}
                </span>
              </span>
              <span className="text-xs font-normal text-slate-400 mr-4">
                {" "}
                {commentTimeStamp}
              </span>
            </h4>
            <span className="text-sm font-normal text-slate-400">
              {" "}
              {commentText}
            </span>
          </div>
        </li>
      </ul>
    </>
  );
};
export default CommentsCard;