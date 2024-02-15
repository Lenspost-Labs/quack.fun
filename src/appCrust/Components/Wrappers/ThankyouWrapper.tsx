import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../assets/Animations/Lottie/login/solanaAnimation.json";

const ThankyouWrapper = () => {
  return (
    <>
   
      <div className="flex flex-col align-middle justify-center items-center m-8">
      QUACK QUACK!
        <Lottie height={200} options={{ animationData: animationData }} />
        <div>Thankyou for your overwhelming response</div>
        <div className="mt-4">
          Farcaster server is currently dreaming of faster processors and more
          RAM. While it's in dreamland, our team is working hard to get it back
          to reality. We appreciate your patience and promise to be back faster
          than you can say 'server reboot'!
        </div>
      </div>
    </>
  );
};

export default ThankyouWrapper;
