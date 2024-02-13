import {
  ENV_IK_RAVESHARE_AUTH_ENDPOINT,
  ENV_IK_UPLOAD_URL,
} from "../../../config/envConfig";
import useCustomImageKit from "../../../hooks/imagekitHooks/useCustomImageKit";
import axios from "axios";

export const apiGetImageCreds = async () => {
  try {
    // const response = await apiInstance.get("/helper/image");
    const response = await axios.get(ENV_IK_RAVESHARE_AUTH_ENDPOINT);
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
    return error;
  }
};

export const apiUploadImage = async (formData: FormData) => {
  try {
    const response = await axios.post(ENV_IK_UPLOAD_URL, formData);
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
    return error;
  }
};
