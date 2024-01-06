import React from "react";
// @ts-ignore
import BsImage from "@meronex/icons/bs/BsImage";
// @ts-ignore
import EnEmojiHappy from "@meronex/icons/en/EnEmojiHappy";
// @ts-ignore
import MdAccessTime from "@meronex/icons/md/MdAccessTime";
import TextArea from "antd/es/input/TextArea";
import { Button, DatePicker, DatePickerProps } from "antd";
import CustomUploadBtn from "../Items/CustomUploadBtn";
// import { Picker } from "emoji-mart";
// import data from '@emoji-mart/data'

const NewPostCard = ({ isInFeed }: { isInFeed: boolean }) => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <div className="relative bg-white mt-2 mb-8 p-2 flex flex-col items-left justify-center rounded-lg">
        <CustomUploadBtn />

        <TextArea
          className=""
          color="yellow"
          placeholder="What's on your mind today?"
          rows={4}
        />
        {/* Icons Wrapper */}

        <div className="flex justify-between align-middle m-1 ">
          <div className="flex ">
            {/* <BsImage size={20} className="m-2 text-slate-700 cursor-pointer" /> */}
            <EnEmojiHappy
              size={20}
              className="m-2 text-slate-700 cursor-pointer"
            />
            {/* <Picker data={data} onEmojiSelect={console.log} /> */}
          </div>

          <div className="flex">
            <div className="m-1.5">
              <DatePicker
                placeholder="Schedule"
                renderExtraFooter={() => ""}
                onChange={onChange}
                showTime
              />
            </div>

            {isInFeed && (
              <Button type="text" className="m-2">
                Post
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPostCard;
