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
