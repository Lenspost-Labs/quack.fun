import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserChip = ({ userFid, username, userPfp, userDisplayName }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  return (
    <>
      <div onClick={() => navigate(`/${localStorage.getItem("fid")}`)}>
        <div className="flex gap-4 align-middle justify-left">
          <div className="">
            {" "}
            <img
              className="w-10 h-10 rounded-full"
              src={userPfp}
              alt={userDisplayName}
            />
          </div>
          <div className="flex flex-col gap-0">
            <div className="">{userDisplayName}</div>
            <div className=" text-sm text-gray-400">{`@${username}`}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChip;
