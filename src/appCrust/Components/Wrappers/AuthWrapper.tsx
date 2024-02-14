import React from "react";
import { SolLoginBtn } from "../Items/SolLoginBtn";
import Lottie from "react-lottie";
import animationData from "../../../assets/Animations/Lottie/login/solanaAnimation.json";
const AuthWrapper = () => {
  return (
    <>
      <div className="flex flex-col gap-2 items-center align-middle justify-center h-100vh">
        <Lottie height={200} options={{ animationData: animationData }} />

        <div className="">
          {" "}
          Log in using your Solana wallet to start quacking!
        </div>
        <SolLoginBtn />
      </div>
    </>
  );
};

export default AuthWrapper;
