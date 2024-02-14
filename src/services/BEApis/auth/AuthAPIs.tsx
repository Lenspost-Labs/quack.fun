import { apiInstance } from "../ApiConfig";

export const apiLogin = async ({
  signature,
  message,
  solana_address,
}: ApiLoginType) => {
  try {
    const response = await apiInstance.post("/auth", {
      signature,
      message,
      solana_address,
    });

    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiGetPaymentPrice = async () => {
  try {
    const response = await apiInstance.get("/auth/register/pay");
    console.log("response", response);

    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiRegisterNewUser = async (txSig: string) => {
  try {
    const response = await apiInstance.post("/auth/register/pay", {
      txSig: txSig,
    });
    console.log("response", response);

    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiUpdateUser = async (data: any) => {
  try {
    const response = await apiInstance.post("/user/set-username-email", data);
    console.log("response", response);

    return response;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};

export const apiUserDetailsforFID = async (data: string) => {
  try {
    const response = await apiInstance.get(`/user/about?target_fid=${data}`);
    console.log("response", response);

    return response?.data;
  } catch (error) {
    console.log("IN API - ERROR");
    console.log(error);
  }
};
