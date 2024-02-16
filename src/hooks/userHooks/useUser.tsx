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

  // Function to check for "fid" in local storage and update userData.fid
  const updateFidFromLocalStorage = () => {
    const storedFid = localStorage.getItem("fid");
    // if (storedFid) {
    setFid(storedFid);
    // }

    console.log("fid updated from local storage");
  };

  // Call the function to check and update fid from local storage
  useEffect(() => {
    updateFidFromLocalStorage();
  }, []);

  // Call the function to check and update fid from local storage every 2 seconds for the first 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateFidFromLocalStorage();
    }, 2000);

    // Clear the interval after 10 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
