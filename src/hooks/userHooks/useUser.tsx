import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useUser = (): useUserType => {
  // const { publicKey: solanaAddress } = useWallet();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    solanaAddress: "",
    evmAddress: "",
    backendAppId: "",
    username: "",
    bio: "",
    name: "",
    profileImgUrl: "",
    coverImgUrl: "",
    fid: "",
  });

  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [hasUserLoggedIn, setHasUserLoggedIn] = useState(false);

  // useEffect(() => {
  //   if (jwt) {
  //     setHasUserLoggedIn(true);
  //   }
  //   if (!jwt) {
  //     setHasUserLoggedIn(false);
  //   }
  // }, [jwt]);

  useEffect(() => {
    if (userData?.solanaAddress) {
      setJwt(localStorage.getItem("jwt"));
    }
  }, [userData?.solanaAddress]);

  useEffect(() => {
    setUserData({
      ...userData,
      fid: localStorage.getItem("fid") || "",
    });
  }, []);

  const fnCheckForFIDAndNavigate = () => {
    console.log("Checking Session");
    // if ((userData as { fid: string })?.fid !== "" && jwt != null) {
    if (
      localStorage.getItem("fid") !== "" &&
      localStorage.getItem("jwt") !== ""
    ) {
      console.log("Navigating to feed");
      navigate("/feed");
      return true;
    } else if (
      localStorage.getItem("fid") == "" ||
      localStorage.getItem("jwt") == ""
    ) {
      localStorage.removeItem("jwt");
      navigate("/auth");
      return false;
    }
  };

  useEffect(() => {
    fnCheckForFIDAndNavigate();
  }, [jwt]);

  useEffect(() => {
    fnCheckForFIDAndNavigate();
  }, []);

  useEffect(() => {
    fnCheckForFIDAndNavigate();
  }, [userData]);

  return {
    userData,
    setUserData,
    jwt,
    setJwt,
    hasUserLoggedIn,
    setHasUserLoggedIn,
  };
};

export default useUser;
