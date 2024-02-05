import React from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import {
  ENV_IK_RAVESHARE_AUTH_ENDPOINT,
  ENV_IK_PUBLIC_KEY,
  ENV_IK_RAVESHARE_URL_ENDPOINT,
} from "src/config/envConfig";

const UtilUploadIK = () => {
  const publicKey = ENV_IK_PUBLIC_KEY;
  let urlEndpoint = ENV_IK_RAVESHARE_URL_ENDPOINT;
  const authenticationEndpoint = ENV_IK_RAVESHARE_AUTH_ENDPOINT;

  return (
    <div className="">
      <p>To use this funtionality please remember to setup the server</p>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticationEndpoint}
      >
        <IKUpload
          folder="posts"
          fileName="abc.jpg"
          tags={["tag1"]}
          useUniqueFileName={true}
          isPrivateFile={false}
        />
      </IKContext>
    </div>
  );
};

export default UtilUploadIK;
