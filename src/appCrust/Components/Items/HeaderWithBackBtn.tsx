import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";
import { Tooltip } from "antd";

const HeaderWithBackBtn = ({
  headerName,
  backToPath,
}: HeaderWithBackBtnType) => {
  return (
    <>
      {" "}
      <div className="flex flex-col sticky top-0 z-40">
        <div className="flex bg-green-500 z-40">
          {/* remove the / in the backToPath */}
          <Tooltip title={backToPath.replace("/", "")} placement="top">
            <div className="mt-2 cursor-pointer">
              {" "}
              <Link to={`${backToPath}`}>
                {" "}
                <BsArrowLeft size={24} />{" "}
              </Link>{" "}
            </div>
          </Tooltip>
          {headerName && <div className="m-2">{headerName}</div>}
        </div>
      </div>
    </>
  );
};

export default HeaderWithBackBtn;
