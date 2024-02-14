import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import BsImage from "@meronex/icons/bs/BsImage";
// @ts-ignore
import EnEmojiHappy from "@meronex/icons/en/EnEmojiHappy";
// @ts-ignore
import MdAccessTime from "@meronex/icons/md/MdAccessTime";
import TextArea from "antd/es/input/TextArea";
import {
  Button,
  // DatePicker,
  DatePickerProps,
  Divider,
  Popover,
  message,
} from "antd";
// import CustomUploadBtn from "../Items/CustomUploadBtn";
import EmojiPicker from "emoji-picker-react";
// import data from "@emoji-mart/data";
import { apiNewPost } from "src/services/BEApis/PostsAPIs/PostsApi";
import UtilUploadtoIK from "../Utils/functions/utilUploadtoIK";
// import useCustomImageKit from "src/hooks/imagekitHooks/useCustomImageKit";
import useUserPosts from "src/hooks/apisHooks/userPosts/useUserPosts";
import { IKContext, IKUpload } from "imagekitio-react";
import {
  ENV_IK_PUBLIC_KEY,
  ENV_IK_RAVESHARE_AUTH_ENDPOINT,
  ENV_IK_RAVESHARE_URL_ENDPOINT,
} from "src/config/envConfig";
import { apiInstance } from "src/services/BEApis/ApiConfig";
// import UtilUploadtoIKJS from "../Utils/functions/utilUploadtoIKJS";

const NewPostCard = ({ isInFeed }: { isInFeed: boolean }) => {
  const [inputValue, setInputValue] = useState("");
  const [scheduleUtcDate, setScheduleUtcDate] = useState(new Date());
  const { setIsLoading, setError } = useUserPosts();

  const [newPostDetails, setNewPostDetails] = useState({
    postTextData: "",
    postImageData: [],
  });

  const publicKey = ENV_IK_PUBLIC_KEY;
  const urlEndpoint = ENV_IK_RAVESHARE_URL_ENDPOINT;
  const ikUploadRefTest = useRef(null);

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setScheduleUtcDate(new Date(dateString));

    console.log(scheduleUtcDate);
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setNewPostDetails((prevDetails) => ({
      ...prevDetails,
      postTextData: e.target.value,
    }));
  };

  const fnPostNewPost = async () => {
    setIsLoading(true);
    setError(null);

    console.log("newPostDetails in fnNewPost", newPostDetails);
    message.loading("Creating a cast");
    try {
      // console.log(inputValue);
      // console.log(scheduleUtcDate);

      const res = await apiNewPost({
        postTextData: newPostDetails.postTextData,
        postImageData: newPostDetails.postImageData, // Fix: Allow array of any length
      });

      console.log(res);
      message.destroy();
      message.success("Cast created successfully");
    } catch (err) {
      console.log(err);
      message.error(`${err}`);
    }
  };

  // -- UtilUploadtoIK Start--

  const authenticator = async () => {
    try {
      const data = await apiInstance.get(ENV_IK_RAVESHARE_AUTH_ENDPOINT);

      // if (!response.ok) {
      //   const errorText = await response.text();
      //   throw new Error(
      //     `Request failed with status ${response.status}: ${errorText}`
      //   );
      // }

      // const data = await response.json();
      const { signature, expire, token } = data?.data;
      console.log("data in authenticator", data?.data);
      return { signature, expire, token };
    } catch (error) {
      throw new Error(
        `Authentication request failed: ${(error as any).message}`
      );
    }
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    console.log("res in OnSuccess - Image Upload", res);

    setNewPostDetails((prevDetails) => ({
      ...prevDetails,
      postImageData: res?.url,
    }));
  };

  // -- UtilUploadtoIK End--

  useEffect(() => {
    handleInput;
  }, [inputValue]);

  return (
    <>
      <div className="relative bg-white p-2 flex flex-col items-left justify-center">
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
            {/* <BsImage size={20} className="m-2 text-slate-700 cursor-pointer" /> */}{" "}
            {/* <UtilUploadtoIK /> */}
            <IKContext
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticator={authenticator}
            >
              <IKUpload
                fileName={Date.now().toString()}
                // tags={["sample-tag1", "sample-tag2"]}
                // customCoordinates={"10,10,10,10"}
                isPrivateFile={false}
                useUniqueFileName={true}
                responseFields={["tags"]}
                validateFile={(file) => file.size < 2000000}
                folder={"posts"}
                // extensions={[
                //   {
                //     name: "remove-bg",
                //     options: {
                //       add_shadow: true,
                //     },
                //   },
                // ]}
                // webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
                overwriteFile={true}
                overwriteAITags={false}
                overwriteTags={false}
                overwriteCustomMetadata={true}
                // customMetadata={{
                //   "brand": "Nike",
                //   "color": "red",
                // }}
                // onError={onError}
                onSuccess={onSuccess}
                // onUploadProgress={onUploadProgress}
                // onUploadStart={onUploadStart}
                // style={{display: 'none'}} // hide the default input and use the custom upload button
                // inputRef={inputRefTest}
                ref={ikUploadRefTest}
              />
              {/* <p>Custom Upload Button</p>
        {inputRefTest && <button onClick={() => inputRefTest.current?.click()}>Upload</button>}
        <p>Abort upload request</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>} */}
            </IKContext>
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

          {/* <div className="flex">
            <div className="m-1.5">
              <DatePicker
                size="small"
                placeholder="Schedule"
                renderExtraFooter={() => ""}
                onChange={onDateChange}
                showTime
              />
            </div>
          </div> */}
          {/* {isInFeed && <Button className="m-1" type="primary">Post</Button>} */}
        </div>
        <div className="flex gap-2 align-middle items-center justify-end">
          {/* {scheduleUtcDate.toDateString() !== "Invalid Date" && (
            <div className="text-xs text-slate-500">
              {scheduleUtcDate.toLocaleString()}
            </div>
          )} */}
          <Button onClick={fnPostNewPost} className="m-1" type="primary">
            Post
          </Button>
        </div>
      </div>
      {isInFeed && <Divider />}
    </>
  );
};

export default NewPostCard;
