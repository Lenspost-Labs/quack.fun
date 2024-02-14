import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const useUser = (): useUserType => {
  const { publicKey: solanaAddress } = useWallet();
  const [userData, setUserData] = useState({
    solanaAddress: solanaAddress?.toString() || "",
    evmAddress: "",
    backendAppId: "",
    username: "",
    bio: "",
    name: "",
    profileImgUrl: "",
    coverImgUrl: "",
    fid: localStorage.getItem("fid") || "",
  });

  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [hasUserLoggedIn, setHasUserLoggedIn] = useState(false);

  

  useEffect(() => {
    if (jwt) {
      setHasUserLoggedIn(true);
    }
    if (!jwt) {
      setHasUserLoggedIn(false);
    }
  }, [jwt]);

  useEffect(() => {
    if (userData?.solanaAddress) {
      setJwt(localStorage.getItem("jwt"));
    }
  }, [userData?.solanaAddress]);
  
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
