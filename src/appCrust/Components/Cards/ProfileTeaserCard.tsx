import { Button } from "antd";
import React from "react";

const ProfileTeaserCard = ({}) => {
  return (
    <>
      <div className="shadow-md border w-64 rounded-md p-2">
        <div className="flex flex-col">
          <div className=" m-2 flex justify-between items-center">
            <div className="">
              <img
                className="w-16 h-16 rounded-full"
                src="https://i.pravatar.cc/300"
                alt=""
              />
            </div>
            <div className="">
              {" "}
              <Button type="primary" onClick={() => {}} className="">
                Follow
              </Button>
            </div>
          </div>
          <div className="mt-2 ml-2"> Name </div>
          <div className="mt-1 ml-2 text-xs"> @Username</div>
          <div className="mt-4 ml-2">
            {" "}
            Lorem ipsum dolor sit. Lorem ipsum dolor ...
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTeaserCard;
