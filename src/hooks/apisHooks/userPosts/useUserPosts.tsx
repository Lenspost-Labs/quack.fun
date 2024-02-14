import { message } from "antd";
import { useEffect, useState } from "react";
import { apiNewPost } from "src/services/BEApis/PostsAPIs/PostsApi";

const useUserPosts = () => {
  const [newPostDetails, setNewPostDetails] = useState({
    postTextData: "",
    postImageData: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fnUpdatePostText = (text: any) => {
  //   setNewPostDetails(
  //     (
  //       prevDetails = {
  //         postTextData: "",
  //         postImageData: [],
  //       }
  //     ) => ({
  //       ...prevDetails,
  //       postTextData: text,
  //     })
  //   );
  // };

  // const fnUpdatePostImages = (images: any) => {
  //   setNewPostDetails(
  //     (
  //       prevDetails = {
  //         postTextData: "",
  //         postImageData: [],
  //       }
  //     ) => ({
  //       ...prevDetails,
  //       postImageData: images,
  //     })
  //   );
  // };

  // const fnPostNewPost = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   console.log("newPostDetails in fnNewPost", newPostDetails);
  //   message.loading("Creating a cast");
  //   try {
  //     // console.log(inputValue);
  //     // console.log(scheduleUtcDate);
  //     const res = await apiNewPost({
  //       postTextData: newPostDetails.postTextData,
  //       postImageData: newPostDetails.postImageData,
  //     });

  //     console.log(res);
  //     message.destroy();
  //     message.success("Cast created successfully");
  //   } catch (err) {
  //     console.log(err);
  //     message.error(`${err}`);
  //   }
  // };

  useEffect(() => {
    console.log("Updated newPostDetails:", newPostDetails);
  }, [newPostDetails]);

  return {
    newPostDetails,
    setNewPostDetails,

    // fnUpdatePostText,
    // fnUpdatePostImages,
    // fnPostNewPost,

    isLoading,
    setIsLoading,
    error,
    setError,
  };
};

export default useUserPosts;
