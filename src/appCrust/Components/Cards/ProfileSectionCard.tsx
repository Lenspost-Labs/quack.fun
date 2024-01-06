import React, { useState } from "react";
import { Button, Modal } from "antd";
import EditProfileCard from "../Cards/EditProfileCard.tsx";

const ProfileSectionCard : React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center gap-4 border-b border-slate-200 p-6 bg-white shadow-sm">
        <div className="shrink-0">
          <a
            href="#"
            className="relative flex h-12 w-12 items-center justify-center rounded-full text-white"
          >
            <img
              src="https://i.pravatar.cc/40?img=7"
              alt="user name"
              title="user name"
              width="48"
              height="48"
              className="max-w-full rounded-full"
            />
            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-yellow-500 p-1 text-sm text-white">
              <span className="sr-only"> online </span>
            </span>
          </a>
        </div>
        <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
          <h4 className="w-full truncate text-base text-slate-700">
            Luke Skywalker
          </h4>
          <p className="w-full truncate text-sm text-slate-500">
            @Jedi_warrior
          </p>

          <p className="w-full truncate text-sm text-slate-500">
            lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>

        <div className="flex justify-between">
          <div className="text-slate-700 m-2 flex flex-col items-center w-24 p-2 bg-yellow-200 shadow-md rounded-md">
            <div className=""> 200 </div>
            <div className=""> Posts </div>
          </div>

          <div className="text-slate-700 m-2 flex flex-col items-center w-24 p-2 bg-yellow-200 shadow-md rounded-md">
            <div className=""> 987k </div>
            <div className=""> Following </div>
          </div>

          <div className="text-slate-700 m-2 flex flex-col items-center w-24 p-2 bg-yellow-200 shadow-md rounded-md">
            <div className=""> 1000k </div>
            <div className=""> Followers </div>
          </div>
        </div>
        <Button
          type="default"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <div className="">Edit Profile</div>
        </Button>

        <Modal
          title="Edit Profile"
          centered
          okText="Update"
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          okButtonProps={{color: "yellow", type: "default"}}
        >
          <EditProfileCard />
        </Modal>
      </div>
    </>
  );
};

export default ProfileSectionCard;
