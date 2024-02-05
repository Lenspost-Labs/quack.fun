import { apiInstance } from "../ApiConfig";

export const apiGetImageCreds = async () => {
  try {
    const response = await apiInstance.get("/helper/image");
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};
