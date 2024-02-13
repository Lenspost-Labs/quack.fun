import React, { useRef } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import {
  ENV_IK_PUBLIC_KEY,
  ENV_IK_RAVESHARE_URL_ENDPOINT,
} from "src/config/envConfig";
import useUserPosts from "src/hooks/apisHooks/userPosts/useUserPosts";

const publicKey = ENV_IK_PUBLIC_KEY;
const urlEndpoint = ENV_IK_RAVESHARE_URL_ENDPOINT;

function UtilUploadtoIK() {
  const ikUploadRefTest = useRef(null);
  const { newPostDetails, setNewPostDetails } = useUserPosts();

  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/imagekit-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(
        `Authentication request failed: ${(error as any).message}`
      );
    }
  };

  const onError = (err: any) => {
    console.log("Error", err);
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    console.log("res in OnSuccess - Image Upload", res);
    setNewPostDetails({
      ...newPostDetails,
      postImageData: res.url,
    });
  };

  const onUploadProgress = (progress: any) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt: any) => {
    console.log("Start", evt);
  };

  return (
    <>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <IKUpload
          fileName={Date.now().toString()}
          // tags={["sample-tag1", "sample-tag2"]}
          // customCoordinates={"10,10,10,10"}
          isPrivateFile={false}
          useUniqueFileName={true}
          responseFields={["tags"]}
          validateFile={(file) => file.size < 2000000}
          folder={"posts"}
          // extensions={[
          //   {
          //     name: "remove-bg",
          //     options: {
          //       add_shadow: true,
          //     },
          //   },
          // ]}
          // webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
          overwriteFile={true}
          overwriteAITags={false}
          overwriteTags={false}
          overwriteCustomMetadata={true}
          // customMetadata={{
          //   "brand": "Nike",
          //   "color": "red",
          // }}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          // style={{display: 'none'}} // hide the default input and use the custom upload button
          // inputRef={inputRefTest}
          ref={ikUploadRefTest}
        />
        {/* <p>Custom Upload Button</p>
        {inputRefTest && <button onClick={() => inputRefTest.current?.click()}>Upload</button>}
        <p>Abort upload request</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>} */}
      </IKContext>
      {/* ...other SDK components added previously */}
    </>
  );
}

export default UtilUploadtoIK;
