import { useState } from "react";

const useUserPosts = () => {
  const [newPostDetails, setNewPostDetails] = useState({
    postTextData: "",
    postImageData: [],
  });

  return { newPostDetails, setNewPostDetails };
};

export default useUserPosts;
