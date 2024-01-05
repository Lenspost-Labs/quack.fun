import React from "react";

const SidebarItem : React.FC<any> = ({ userPicture, itemName, dashIcon, statusIcon }: any) => {
  return (
    <div className="px-2">
      <div className="cursor-pointer flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-yellow-50 hover:text-yellow-500 focus:bg-yellow-50 aria-[current=page]:bg-yellow-50 aria-[current=page]:text-yellow-500 ">
        {(userPicture || dashIcon) && (
          <div className="relative inline-flex h-6 w-6 items-center justify-center rounded-full text-white">
            {userPicture && (
              <img
                src={userPicture}
                alt="user name"
                title="user name"
                width="24"
                height="24"
                className="max-w-full rounded-full"
              />
            )}

            {dashIcon && <>{dashIcon}</>}
            {statusIcon && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-yellow-500 p-1 text-sm text-white">
                <span className="sr-only"> offline </span>
              </span>
            )}
          </div>
        )}

        <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
          {itemName}
        </div>
      </div>
    </div>
  );
};

export default SidebarItem;