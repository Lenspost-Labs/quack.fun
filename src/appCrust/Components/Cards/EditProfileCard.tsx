import React from "react";
// @ts-ignore
import MdEdit from "@meronex/icons/md/MdEdit";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";

const EditProfileCard = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="shrink-0">
          <a
            href="#"
            className="relative flex h-12 w-12 items-center justify-center rounded-full text-white"
          >
            <img
              src="https://i.pravatar.cc/40?img=7"
              alt="user name"
              title="user name"
              width="88"
              height="88"
              className="max-w-full rounded-full"
            />
            {/* <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 p-1">
            </span> */}
            <Button type="default" shape="circle" icon={<MdEdit size={12} />} />
          </a>
        </div>
        {/* <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-center justify-center gap-0 text-center">
            <div className="flex ">

          <h4 className="w-full truncate text-base text-slate-700">
            Luke Skywalker
          </h4>
          <Button type="link" shape="circle" icon={<MdEdit size={12} />} />
            </div>
          <p className="w-full truncate text-sm text-slate-500">
            @Jedi_warrior
          </p>
        </div> */}
        <TextArea
          defaultValue={"Luke Skywalker"}
          placeholder={"Luke Skywalker"}
          autoSize
        />
        <TextArea
          defaultValue="@Jedi_warrior"
          placeholder={"@Jedi_warrior"}
          autoSize
        />
        <TextArea defaultValue="Bio" placeholder={"Bio"} autoSize />
      </div>
    </>
  );
};

export default EditProfileCard;