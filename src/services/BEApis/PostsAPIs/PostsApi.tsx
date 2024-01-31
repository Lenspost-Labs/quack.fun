import { apiInstance } from "../ApiConfig";

export const apiGetPosts = async () => {
  try {
    const response = await apiInstance.get("/user/post");
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiNewPost = async ({
  postTextData,
  postImageData,
}: ApiNewPostsType) => {
  try {
    const response = await apiInstance.post("/user/post", {
      body: postTextData,
      images: postImageData,
    });
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiGetFeed = async () => {
  try {
    const response = await apiInstance.get("/user/post/feed");
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
}

