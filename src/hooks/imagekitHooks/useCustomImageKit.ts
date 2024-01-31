import { useEffect } from "react";
import {
  ENV_IK_RAVESHARE_URL_ENDPOINT,
  ENV_IK_PUBLIC_KEY,
  ENV_IK_RAVESHARE_AUTH_ENDPOINT,
} from "../../config/envConfig";
import { apiGetImageCreds } from "../../services/BEApis/IKApis/ImageCredsAPIs";

const useCustomImageKit = () => {
  var IKUploadParams = {
    urlEndpoint: ENV_IK_RAVESHARE_URL_ENDPOINT,
    publicKey: ENV_IK_PUBLIC_KEY,
    authenticationEndpoint: ENV_IK_RAVESHARE_AUTH_ENDPOINT,
    token: "",
    expire: 0,
    signature: "",
  };

  const fnGetIKCredentials = async () => {
    const res = await apiGetImageCreds();
    console.log(res);
    // Add the data to IKUploadParams
    IKUploadParams = {
      ...IKUploadParams,
      token: res?.data?.token,
      expire: res?.data?.expire,
      signature: res?.data?.signature,
    };

    return res;
  };
  useEffect(() => {
    fnGetIKCredentials();
  }, []);

  
  return { IKUploadParams };
};

export default useCustomImageKit;
