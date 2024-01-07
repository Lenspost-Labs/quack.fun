import React, { useState } from "react";
// @ts-ignore
import BsImage from "@meronex/icons/bs/BsImage";
// @ts-ignore
import EnEmojiHappy from "@meronex/icons/en/EnEmojiHappy";
// @ts-ignore
import MdAccessTime from "@meronex/icons/md/MdAccessTime";
import TextArea from "antd/es/input/TextArea";
import { Button, DatePicker, DatePickerProps, Dropdown, MenuProps } from "antd";
import CustomUploadBtn from "../Items/CustomUploadBtn";
import EmojiPicker from "emoji-picker-react";
// import { Picker } from "emoji-mart";
// import data from '@emoji-mart/data'

const NewPostCard = ({ isInFeed }: { isInFeed: boolean }) => {
  const [inputValue, setInputValue] = useState("");

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const items: MenuProps["items"] = [
    {
      label: <EmojiPicker onEmojiClick={(e) => console.log(e)} />,
      key: "0",
    },
  ];

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="relative bg-white p-2 flex flex-col items-left justify-center rounded-lg">
        {!isInFeed && <CustomUploadBtn isInFeed={isInFeed} />}
        <TextArea
          color="yellow"
          placeholder="What's on your mind today?"
          rows={4}
          className={"m-1"}
          value={inputValue}
          onChange={handleInput}
        />

        <div className="flex justify-between align-middle m-1 ">
          <div className="flex ">
            {/* <BsImage size={20} className="m-2 text-slate-700 cursor-pointer" /> */}
            {isInFeed && <CustomUploadBtn isInFeed={isInFeed} />}

            {/* Testing Emoji - WIP */}
            {/* <Dropdown menu={{ items }} trigger={["click"]}>
              <div onClick={(e) => e.preventDefault()}> */}
            <EnEmojiHappy
              size={20}
              className=" ml-4 m-1.5 text-slate-500 cursor-pointer"
            />
            {/* </div>
            </Dropdown> */}
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
