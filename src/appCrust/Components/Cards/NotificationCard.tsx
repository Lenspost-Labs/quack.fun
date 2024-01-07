import React from "react";

const NotificationCard : React.FC<any> = ({
  userProfileName,
  userProfileUsername,
  userProfileImage,
  userNotifText,
  userNotifFor,
}: NotificationType) => {
  return (
    <>
      {/*<!-- Component: Social story card --> */}
      <div className="overflow-hidden bg-white border-b-2  text-slate-500 hover:bg-slate-100 hover:cursor-pointer">
        {/*  <!-- Header--> */}
        <div className="px-4 pt-4 ">
          <header className="flex gap-2">
            <a
              href="#"
              className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white"
            >
              <img
                src={userProfileImage}
                alt="user name"
                title="user name"
                width="32"
                height="32"
                className="max-w-full rounded-full "
              />
            </a>
            <div className="flex gap-2 items-center">
              <h3 className="text-sm font-medium text-slate-700">
                {userProfileName}
              </h3>
              <p className="text-sm text-slate-400"> @{userProfileUsername}</p>
            </div>
          </header>
        </div>

        <div className="px-6 py-2">
          <p className="text-sm">{userNotifFor}</p>
          <p className="py-2 text-md text-gray-800">{userNotifText}</p>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;