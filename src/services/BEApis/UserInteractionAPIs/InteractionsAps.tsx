import { apiInstance } from "../ApiConfig";

export const apiFollowAUser = async (data: any) => {
  try {
    const response = await apiInstance.post(`/user/follow?target_fid=${data}`);
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

//   /user/unfollow?target_fid=11889

export const apiUnfollowAUser = async (data: any) => {
  try {
    const response = await apiInstance.post(
      `/user/unfollow?target_fid=${data}`
    );
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiDoesUserFollow = async (data: any) => {
  try {
    const response = await apiInstance.get(
      `/user/does-follow?target_fid=${data}`
    );
    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};
