import { apiInstance } from "../ApiConfig";

export const apiGetComments = async (data: any) => {
  try {
    const response = await apiInstance.get("/user/post/child", data);
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};
