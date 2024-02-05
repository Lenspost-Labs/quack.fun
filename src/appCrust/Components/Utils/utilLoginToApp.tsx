import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import useUser from "src/hooks/userHooks/useUser";
import Lottie from "react-lottie";
import animationData from "../../../assets/Animations/Lottie/Loaders/LoadingWeb3.json";
import useUserAuth from "src/hooks/apisHooks/userAuth/useUserAuth";
import { utilDecodeJWT } from "./utilDecodeJWT";

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
      setIsOnboardingModalOpen(false);
      setModalMessage("Welcome Back! 🎉");
      return;
    }

    if (!loginInfo) {
      setIsOnboardingModalOpen(false);
      return;
    }

    setModalMessage("Please sign and pay to confirm the transaction.");
    const txSig = await fnGetPriceAndSign();
    if (txSig) {
      message.success("Payment received successfully");
    } else {
      message.error("Payment failed");
      setIsOnboardingModalOpen(false);
      return;
    }

    setModalMessage("Please wait while we register your wallet.");
    await fnTriggerRegister(txSig);

    message.success("Login Successful! Your Account is now ready to quack. 🎉");
    setIsOnboardingModalOpen(false);

    setHasUserLoggedIn(true);
  };

  return (
    <>
      {" "}
      {!hasUserLoggedIn && <Button onClick={fnUserAuth}>Login</Button>}
      <Modal
        width={400}
        centered
        okText="Sign"
        footer={null}
        onCancel={() => setIsOnboardingModalOpen(false)}
        title="Quick Login to Quack!"
        open={isOnboardingModalOpen}
      >
        <div className="flex flex-col">
          <div className=""> {modalMessage}</div>
          <Lottie height={200} options={{ animationData: animationData }} />
        </div>
      </Modal>
    </>
  );
};
