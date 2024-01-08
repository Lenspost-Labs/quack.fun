import React, { useState } from "react";
// @ts-ignore
import BsImage from "@meronex/icons/bs/BsImage";
// @ts-ignore
import EnEmojiHappy from "@meronex/icons/en/EnEmojiHappy";
// @ts-ignore
import MdAccessTime from "@meronex/icons/md/MdAccessTime";
import TextArea from "antd/es/input/TextArea";
import { Button, DatePicker, DatePickerProps, Divider, Popover } from "antd";
import CustomUploadBtn from "../Items/CustomUploadBtn";
import EmojiPicker from "emoji-picker-react";
import data from "@emoji-mart/data";

const NewPostCard = ({ isInFeed }: { isInFeed: boolean }) => {
  const [inputValue, setInputValue] = useState("");

  console.log(data);

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

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

            <Popover
              placement="bottom"
              content={
                <EmojiPicker
                  style={{ width: "100%" }}
                  onEmojiClick={(e) => {
                    console.log(e);
                    setInputValue(inputValue + e.emoji);
                  }}
                />
              }
            >
              <EnEmojiHappy
                size={20}
                className=" m-2 text-slate-500 cursor-pointer"
              />
            </Popover>
          </div>

          <div className="flex">
            <div className="m-1.5">
              <DatePicker
                placeholder="Schedule"
                renderExtraFooter={() => ""}
                onChange={onDateChange}
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
        <Divider/>
      </div>
    </>
  );
};

export default NewPostCard;
