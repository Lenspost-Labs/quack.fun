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
    // fid: "",
  });

  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [fid, setFid] = useState(localStorage.getItem("fid"));
  const [hasUserLoggedIn, setHasUserLoggedIn] = useState(false);

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
    fid,
    setFid,
    hasUserLoggedIn,
    setHasUserLoggedIn,
  };
};

export default useUser;
