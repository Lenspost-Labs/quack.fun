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
      text: postTextData,
      embeds: postImageData,
    });
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiGetFeed = async (data: string) => {
  try {
    const response = await apiInstance.get(`/user/post/feed?cursor=${data}`);
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiReactForAPost = async (data: any) => {
  try {
    const response = await apiInstance.post("/user/post/react", data);
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiDeletePost = async (data: any) => {
  try {
    const response = await apiInstance.post(`/user/post?hash=${data}`);
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiViewSinglePost = async (data: any) => {
  try {
    console.log(data);
    if (!data) {
      console.log("IN API - data is null");
      return;
    }
    const response = await apiInstance.get(
      `/user/post/cast?fid=${data.fid}&hash=${data.hash}`
    );
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiGetCastsForFid = async (data: any) => {
  try {
    const response = await apiInstance.get(`/user/post/for-fid?fid=${data}`);
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiActOnAPost = async (data: any) => {
  try {
    const response = await apiInstance.post("/user/post/act", data);
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};
