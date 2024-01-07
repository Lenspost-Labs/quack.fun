import React, { useState } from "react";
import { Button, Modal } from "antd";
import EditProfileCard from "../Cards/EditProfileCard.tsx";

const ProfileSectionCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-slate-200 p-6 bg-white shadow-sm">
        <img
          src="https://th.bing.com/th/id/R.9d27f08978a6fc2adb39a334c5ce7caf?rik=Dr3rFksaf3mDzQ&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1504196944588-6a0df8be8513%3fcrop%3dentropy%26cs%3dtinysrgb%26fit%3dmax%26fm%3djpg%26ixid%3dMXwxMjA3fDB8MXxzZWFyY2h8MXx8Y2QlMjBjb3Zlcnx8MHx8fA%26ixlib%3drb-1.2.1%26q%3d80%26w%3d1080&ehk=e0oUVjL9HrFdBqv420%2fOYz4e5O31cPhAd946ZXjYNos%3d&risl=&pid=ImgRaw&r=0"
          alt="Cover Image"
          title=" Cover Image"
          width="100%"
          height="48"
          className="h-32"
        />

        <div className="flex justify-between items-center">
          <div className="flex min-h-[2rem] flex-col gap-0 w-full">
            <img
              src="https://i.pravatar.cc/40?img=7"
              alt="user name"
              title="user name"
              width="48"
              height="48"
              className="rounded-full"
            />
            <h4 className="mt-2 truncate text-base text-slate-700">
              Luke Skywalker
            </h4>
            <p className="mt-1 truncate text-sm text-slate-500">@Jedi_warrior</p>
          </div>

          <div className="">
            <Button
              type="default"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Edit Profile
            </Button>
          </div>
        </div>
        <p className="truncate text-sm text-slate-500 text-wrap">
          lorem ipsum dolor sit amet consectetur adipiscing elit sed do
        </p>

        {/* <div className="flex justify-between">
          <div className="text-slate-700 m-2 flex flex-col items-center w-24 p-2 bg-yellow-200 shadow-sm rounded-md">
            <div className=""> 200 </div>
            <div className=""> Posts </div>
          </div>

          <div className="text-slate-700 m-2 flex flex-col items-center w-24 p-2 bg-yellow-200 shadow-sm rounded-md">
            <div className=""> 987k </div>
            <div className=""> Following </div>
          </div>

          <div className="text-slate-700 m-2 flex flex-col items-center w-24 p-2 bg-yellow-200 shadow-sm rounded-md">
            <div className=""> 1000k </div>
            <div className=""> Followers </div>
          </div>
        </div> */}

        <Modal
          title="Edit Profile"
          centered
          okText="Update"
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          okButtonProps={{ color: "yellow", type: "default" }}
        >
          <EditProfileCard />
        </Modal>
      </div>
    </>
  );
};

export default ProfileSectionCard;
