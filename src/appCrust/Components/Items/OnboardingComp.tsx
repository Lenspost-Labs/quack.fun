import React, { useRef, useState } from "react";
import { Button, Input, InputRef, Modal, message } from "antd";
import useUser from "src/hooks/userHooks/useUser";
import Lottie from "react-lottie";
import animationData2 from "../../../assets/Animations/Lottie/onboarding/onboardingAnimation.json";

import useUserAuth from "src/hooks/apisHooks/userAuth/useUserAuth";
import {
  apiCheckUsernameAvailable,
  apiUpdateUser,
} from "src/services/BEApis/auth/AuthAPIs";
import { useNavigate } from "react-router-dom";

export const OnboardingComp = () => {
  const { hasUserLoggedIn, setHasUserLoggedIn, fid, setFid } = useUser();
  const [modalMessage, setModalMessage] = useState<string>(
    "Edit your profile details"
  );
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] =
    useState<boolean>(true);

  const { fnTriggerLogin, fnTriggerGetPriceAndSign, fnTriggerRegister } =
    useUserAuth();

  const onboardUsernameRef = useRef<InputRef>(null);
  const onboardEmailRef = useRef<InputRef>(null);
  const [onboardValidation, setOnboardValidation] = useState({
    username: false,
    email: false,
  });
  const [showOnboardValidation, setShowOnboardValidation] =
    useState<boolean>(false);

  const [checkingAvailability, setCheckingAvailability] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const fnUserAuth = async () => {
    setIsOnboardingModalOpen(true);

    setModalMessage("Please Sign the Message to connect to your wallet.");
    const loginInfo = await fnTriggerLogin(); //Only need to set JWT here
    console.log("loginInfo", loginInfo);

    // If there is JWT and FID - User is already Registered
    // No need to call Payment API
    // if (
    //   localStorage.getItem("jwt") !== "" &&
    //   localStorage.getItem("fid") !== ""
    // ) {
    //   setHasUserLoggedIn(true);
    //   message.success("Welcome back to Quack! 🎉 ");
    //   console.log(localStorage.getItem("jwt"));
    //   console.log(localStorage.getItem("fid"));
    //   navigate("/feed");
    //   return;
    // }

    // If there is FID but no JWT - Login Issue
    // No need to call Payment API
    if (
      localStorage.getItem("jwt") == "" &&
      localStorage.getItem("fid") !== ""
    ) {
      // setHasUserLoggedIn(true);
      message.error("Login Failed! Please try again - JWT Err");
      navigate("/auth");
      return;
    }

    // If there is username and FID - User is already Registered
    // No need to call Payment API
    // No need to trigger the Onboarding Modal
    if (
      loginInfo?.username !== "" &&
      loginInfo?.fid !== "" &&
      localStorage.getItem("fid") !== ""
    ) {
      setHasUserLoggedIn(true);
      setIsOnboardingModalOpen(false); //Commmented for testing purpose only
      setModalMessage("Welcome Back! 🎉");
      message.success("Welcome back to Quack! 🎉 ");

      navigate("/");
      return;
    }

    // If there is no response from the API
    if (!loginInfo) {
      // setIsOnboardingModalOpen(false);
      localStorage.removeItem("jwt");
      return;
    }

    // If there is JWT and no FID - User is not Registered
    // Call the Payment API
    if (
      localStorage.getItem("jwt") !== "" &&
      localStorage.getItem("fid") == ""
    ) {
      setModalMessage(
        "Farcaster requires a registration fee for account activation. Upon registration, you will be prompted to make a payment for your account."
      );
      const txSig = await fnTriggerGetPriceAndSign();

      // Returning Null if the user has already logged in
      // if (txSig === null) {
      //   message.success("Welcome back to Quack! 🎉 ");
      //   setHasUserLoggedIn(true);
      //   setModalMessage("Let's start Quacking! 🦆");
      //   // setIsOnboardingModalOpen(false);
      //   return;
      // }
      if (txSig) {
        message.success("Payment received successfully");
        localStorage.setItem("jwt", loginInfo?.jwt || "");
        localStorage.setItem("fid", loginInfo?.fid || "");
      } else {
        message.error("Payment failed");
        localStorage.removeItem("jwt");
        setIsOnboardingModalOpen(false);
        return;
      }

      setModalMessage("Please wait while we register your wallet.");
      const registerStatus = await fnTriggerRegister(txSig);
      console.log("registerStatus", registerStatus);

      // if(registerStatus) {
      //   localStorage.removeItem("jwt");
      //   message.error("Registration Failed");
      //   return;
      // }

      message.success(
        "Login Successful! Your Account is now ready to quack. 🎉"
      );
      // setIsOnboardingModalOpen(false);

      setModalMessage("Let's start Quacking! 🎉");
    }
    setHasUserLoggedIn(true);
    setFid(localStorage.getItem("fid"));
    navigate("/feed");
  };

  let timeoutId;
  const fnCheckInputBoxIsTyping = () => {
    // Clear the previous timeout (if any)
    clearTimeout(timeoutId);
    // Set a new timeout for 1 second
    timeoutId = setTimeout(function () {
      // Call your function after 1 seconds of no typing
      handleUsernameValidation();
    }, 1000);
  };

  const handleUsernameValidation = async () => {
    setCheckingAvailability(true);
    const ipUsername = onboardUsernameRef.current?.input?.value;
    const checkUsername = await apiCheckUsernameAvailable(ipUsername);

    console.log("checkUsername", checkUsername?.data?.available);
    if (checkUsername?.data?.available === true) {
      setShowOnboardValidation(true);
      setOnboardValidation({
        ...onboardValidation,
        username: true,
      });
    } else {
      setShowOnboardValidation(true);
      setOnboardValidation({
        ...onboardValidation,
        username: false,
      });
    }
    setCheckingAvailability(false);
  };

  const fnHandleOnboarding = async () => {
    // setIsOnboardingModalOpen(true);
    // console.log("onboardUsernameRef", onboardUsernameRef.current?.input?.value);
    // console.log("onboardEmailRef", onboardEmailRef.current?.input?.value);

    try {
      const onboardingStatus = await apiUpdateUser({
        username: onboardUsernameRef.current?.input?.value,
        email: onboardEmailRef.current?.input?.value,
      });
      // console.log("onboardingStatus", onboardingStatus);
      if (onboardingStatus) {
        setShowOnboardValidation(true);
        setOnboardValidation({
          ...onboardValidation,
          username: true,
        });
        message.success("Account Created Successfully! 🎉");
        setIsOnboardingModalOpen(false);
        navigate("/feed");
      }

      if (!onboardingStatus) {
        setShowOnboardValidation(true);
        setOnboardValidation({
          ...onboardValidation,
          username: false,
        });
        message.error("Account Creation Failed!");
      }
    } catch (err) {
      console.log("onboardingStatus", err);
      message.error("Account Creation Failed! ❌ Error :" + err);
      setIsOnboardingModalOpen(false);
    }
  };
  return (
    <>
      <Modal
        open={isOnboardingModalOpen}
        onCancel={() => setIsOnboardingModalOpen(false)}
        footer={null}
        // closable={false}
      >
        <div className="flex flex-col align-middle items-center justify-center m-4">
          <div className="mt-2 text-lg"> {modalMessage}</div>
          <div className="mt-4">
            <Lottie height={200} options={{ animationData: animationData2 }} />
          </div>

          <div className="mt-4 w-full">
            {" "}
            <div className="mt-4 text-sm text-gray-500">
              Sail into Quack with a personality-packed username!
            </div>
            <div className="mt-4">
              <Input
                ref={onboardUsernameRef}
                onInput={fnCheckInputBoxIsTyping}
                placeholder="Username"
              />
            </div>
            {checkingAvailability && (
              <div className="mt-2 text-yellow-600"> Checking availability</div>
            )}
            {!checkingAvailability && showOnboardValidation && (
              <div className="mt-2 text-yellow-600">
                {" "}
                {onboardValidation.username === true ? (
                  <div className="text-green-600"> Username is available</div>
                ) : (
                  <div className="text-red-600">Username is not available</div>
                )}
              </div>
            )}
          </div>

          <div className="mt-2 w-full">
            {" "}
            <div className="mt-4 text-sm text-gray-500">
              {" "}
              Join Quack and stay updated. Enter your email.
            </div>
            <div className="mt-4">
              <Input ref={onboardEmailRef} placeholder="Email" />
            </div>
            {/* {showOnboardValidation && (
                  <div className="mt-2 text-yellow-600">
                    {" "}
                    {onboardValidation.email}
                  </div>
                )} */}
          </div>
          <div className="mt-4 w-full">
            <Button
              disabled={!onboardValidation.username}
              className="w-full"
              onClick={fnHandleOnboarding}
              type="primary"
            >
              Update Profile
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
