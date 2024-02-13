import React, { useState } from "react";
import { Button, Input, Modal, message } from "antd";
import useUser from "src/hooks/userHooks/useUser";
import Lottie from "react-lottie";
import animationData1 from "../../../../assets/Animations/Lottie/Loaders/LoadingWeb3.json";
import animationData2 from "../../../../assets/Animations/Lottie/onboarding/onboardingAnimation.json";

import useUserAuth from "src/hooks/apisHooks/userAuth/useUserAuth";
import { utilDecodeJWT } from "../functions/utilDecodeJWT";

export const UtilLoginToApp = () => {
  const { hasUserLoggedIn, setHasUserLoggedIn, userData, setUserData } =
    useUser();
  const [modalMessage, setModalMessage] = useState<string>(
    "Sign in with your wallet, and Pay a small fee to start your presence on-chain on Quack!"
  );
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] =
    useState<boolean>(false);

  const { fnTriggerLogin, fnGetPriceAndSign, fnTriggerRegister } =
    useUserAuth();

  const fnUserAuth = async () => {
    setIsOnboardingModalOpen(true);

    setModalMessage("Please Sign the Message to connect to your wallet.");
    const loginInfo = await fnTriggerLogin(); //Only need to set JWT here
    console.log("loginInfo", loginInfo);
    const decodedJWT = utilDecodeJWT(loginInfo?.jwt || "");
    console.log("decodedJWT", decodedJWT);
    if (decodedJWT) {
      setUserData({
        evmAddress: (decodedJWT as { evmAddress?: string })?.evmAddress || "",
      });
    }
    if ((userData as { evmAddress: string }).evmAddress !== "") {
      setHasUserLoggedIn(true);
      // setIsOnboardingModalOpen(false);
      setModalMessage("Welcome Back! 🎉");
      return;
    }

    if (!loginInfo) {
      // setIsOnboardingModalOpen(false);
      return;
    }

    setModalMessage("Please sign and pay to confirm the transaction.");
    const txSig = await fnGetPriceAndSign();

    // Returning Null if the user has already logged in
    if (txSig === null) {
      message.success("Welcome back to Quack! 🎉 ");
      setHasUserLoggedIn(true);
      setModalMessage("Let's start Quacking! 🦆");
      // setIsOnboardingModalOpen(false);
      return;
    }
    if (txSig) {
      message.success("Payment received successfully");
    } else {
      message.error("Payment failed");
      // setIsOnboardingModalOpen(false);
      return;
    }

    setModalMessage("Please wait while we register your wallet.");
    await fnTriggerRegister(txSig);

    message.success("Login Successful! Your Account is now ready to quack. 🎉");
    // setIsOnboardingModalOpen(false);

    setModalMessage("Let's start Quacking! 🎉");
    setHasUserLoggedIn(true);
  };

  const fnHandleOnboarding = () => {
    // setIsOnboardingModalOpen(true);
  };
  return (
    <>
      {" "}
      {!hasUserLoggedIn && <Button onClick={fnUserAuth}>Login</Button>}
      <Modal
        width={800}
        centered
        okText="Sign"
        footer={null}
        onCancel={() => setIsOnboardingModalOpen(false)}
        title="Quick Login to Quack!"
        open={isOnboardingModalOpen}
      >
        <div className="flex flex-col justify-center align-middle items-center">
          {!hasUserLoggedIn && (
            <>
              <div className=""> {modalMessage}</div>
              <Lottie
                height={200}
                options={{ animationData: animationData1 }}
              />
            </>
          )}

          {hasUserLoggedIn && (
            <div className="w-96 flex flex-col align-middle items-center my-4">
              <div className="mt-2 text-lg"> {modalMessage}</div>
              <div className="mt-4">
                <Lottie
                  height={200}
                  options={{ animationData: animationData2 }}
                />
              </div>

              <div className="mt-4 w-full">
                {" "}
                <div className="mt-4 text-sm text-gray-500">
                  Sail into Quack with a personality-packed username!
                </div>
                <div className="mt-4">
                  <Input placeholder="Username" />
                </div>
              </div>

              <div className="mt-2 w-full">
                {" "}
                <div className="mt-4 text-sm text-gray-500">
                  {" "}
                  Join Quack and stay updated. Enter your email.
                </div>
                <div className="mt-4">
                  <Input placeholder="Email" />
                </div>
              </div>
              <div className="mt-4 w-full">
                <Button
                  // disabled={false}
                  className="w-full"
                  onClick={fnHandleOnboarding}
                  type="primary"
                >
                  Create an account
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
