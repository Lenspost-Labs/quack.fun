import { useWallet } from "@solana/wallet-adapter-react";
import { Button, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import useUserAuth from "src/hooks/apisHooks/userAuth/useUserAuth";
import animationData1 from "../../../assets/Animations/Lottie/Loaders/LoadingWeb3.json";
import UserChip from "./UserChip";
import { OnboardingComp } from "./OnboardingComp";

const CustomLoginBtn = () => {
  const {
    wallet,
    connect,
    disconnect,
    wallets,
    select,
    connected,
    connecting,
  } = useWallet();
  const [installedWallets, setInstalledWallets] = useState<any>({
    wallet: "",
    name: "",
    icon: "",
    connected,
  });

  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<string>("");
  const [inLoginFlow, setInLoginFlow] = useState<boolean>(false);
  const [inOboardingFlow, setInOboardingFlow] = useState<boolean>(false);

  const navigate = useNavigate();
  //   Login Utils - useUserAuth
  const { fnTriggerLogin, fnTriggerGetPriceAndSign, fnTriggerRegister } =
    useUserAuth();
  const [modalTitle, setModalTitle] = useState<string>(
    "Select a wallet to continue"
  );
  const [modalMessage, setModalMessage] = useState<string>(
    "Sign the message in your Selected Wallet"
  );

  const fnLogoutFlow = () => {
    disconnect();

    message.success("Disconnected");
    localStorage.removeItem("jwt");
    localStorage.removeItem("fid");
    localStorage.removeItem("username");

    setIsWalletModalOpen(false);
    navigate("/auth");
  };

  const modalOpenOrClose = () => {
    setIsWalletModalOpen(!isWalletModalOpen);
  };

  const fnSelectAndLogin = async (wallet: any) => {
    select(wallet);
    connect();
  };

  const fnCheckForLogin = () => {
    if (
      localStorage.getItem("jwt") !== "" &&
      localStorage.getItem("fid") !== ""
      // localStorage.getItem("username") !== ""
    ) {
      setLoginStatus("success");

      return true;
    } else return false;
  };

  const fnLoginFlow = async () => {
    setInLoginFlow(true);
    // Step 1 :
    const loginInfo = await fnTriggerLogin(); //Only need to set JWT here
    console.log("loginInfo", loginInfo);
    // If there is no response from the API
    if (!loginInfo) {
      // setIsOnboardingModalOpen(false);
      localStorage.removeItem("jwt");
      return;
    }

    // If there is no username and FID - User has Registered but not set Username
    // No need to call Payment API
    // Open onboarding flow
    if (
      loginInfo?.jwt !== "" &&
      loginInfo?.fid !== "" &&
      loginInfo?.username == ""
    ) {
      localStorage.setItem("jwt", loginInfo.jwt);
      localStorage.setItem("fid", loginInfo.fid);
      localStorage.setItem("username", loginInfo.username);
      setLoginStatus("success");
      setInOboardingFlow(true);
    }
    // If there is username and FID - User is already Registered
    // No need to call Payment API
    if (
      loginInfo?.username !== "" &&
      loginInfo?.fid !== "" &&
      loginInfo?.jwt !== ""
    ) {
      localStorage.setItem("jwt", loginInfo.jwt);
      localStorage.setItem("fid", loginInfo.fid);
      localStorage.setItem("username", loginInfo.username);
      setLoginStatus("success");

      setIsWalletModalOpen(false);
      setLoginStatus("success");
      navigate("/");
    }

    // If there is JWT and no FID and no Username - User is not Registered
    // Call the Payment API
    if (
      loginInfo?.username === "" &&
      loginInfo?.fid === "" &&
      loginInfo?.jwt !== ""
    ) {
      setModalTitle("Login to Quack");
      setModalMessage(
        "Farcaster requires a registration fee for account activation. Upon registration, you will be prompted to make a payment for your account."
      );
      const txSig = await fnTriggerGetPriceAndSign();
      if (txSig) {
        message.success("Payment received successfully");
        localStorage.setItem("jwt", loginInfo?.jwt || "");
        localStorage.setItem("fid", loginInfo?.fid || "");
        localStorage.setItem("username", loginInfo?.username || "");
      } else {
        message.error("Payment failed");
        localStorage.removeItem("jwt");
        // setIsOnboardingModalOpen(false);
        return;
      }

      setModalMessage("Please wait while we register your wallet.");
      const registerStatus = await fnTriggerRegister(txSig);
      console.log("registerStatus", registerStatus);
      // if(registerStatus?.) {
      //   message.success("Registration Successful");
      //   localStorage.setItem("jwt", loginInfo.jwt);
      //   localStorage.setItem("fid", loginInfo.fid);
      //   localStorage.setItem("username", loginInfo.username);
      //   setLoginStatus("success");
      //   setIsWalletModalOpen(false);
      //   navigate("/");
      // }
      setInOboardingFlow(true);
    }
    setInLoginFlow(false);
  };

  useEffect(() => {
    if (connected) {
      if (fnCheckForLogin) {
        fnLoginFlow();
        setLoginStatus("success");
      }
    } else {
      setLoginStatus("");
    }
  }, [connected]);

  return (
    <>
      {loginStatus !== "success" && (
        <Button type="primary" onClick={modalOpenOrClose}>
          {" "}
          Login
        </Button>
      )}

      {loginStatus === "success" && (
        // <Button type="primary" onClick={fnLogoutFlow}>
        //   Logout
        // </Button>
        <UserChip propFnOnDisconnect={fnLogoutFlow} />
      )}

      <Modal
        width={400}
        maskClosable={false}
        centered
        title={modalTitle}
        onCancel={fnLogoutFlow}
        open={isWalletModalOpen}
        footer={null}
      >
        <div className="modalWrapper py-2 ">
          {inLoginFlow && connected && !inOboardingFlow && (
            <>
              <div className="flex justify-center">{modalMessage}</div>
              <Lottie
                height={200}
                options={{ animationData: animationData1 }}
              />
            </>
          )}

          {inOboardingFlow && connected && <OnboardingComp />}
          {!connected && (
            <>
              <ul className="flex flex-col gap-2">
                {wallets
                  .filter((item) => item.readyState === "Installed")
                  .map((wallet: any, index: number) => (
                    <li key={index}>
                      <div
                        onClick={() => {
                          fnSelectAndLogin(wallet?.adapter?.name);
                        }}
                        className="p-2 rounded-md flex items-center align-middle justify-between gap-4 bg-gray-50 cursor-pointer hover:bg-slate-200"
                      >
                        <div className="flex gap-4 items-center align-middle ">
                          <img
                            className="w-10 h-10"
                            src={wallet.adapter.icon}
                          />
                          <div className="text-xl">{wallet.adapter.name}</div>
                        </div>

                        <div className="text-xs">
                          {wallet.adapter.connected
                            ? "Connected"
                            : "Click to connect"}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
              {wallets.length === 0 && (
                <div>
                  No wallets found, please install a solana wallet on your
                  browser to continue
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CustomLoginBtn;
