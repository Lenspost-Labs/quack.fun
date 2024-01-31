import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

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
  });
  
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [hasUserLoggedIn, setHasUserLoggedIn] = useState(false);

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
