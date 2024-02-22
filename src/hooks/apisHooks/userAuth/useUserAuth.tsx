import { useWallet } from "@solana/wallet-adapter-react";
import useSolWallet from "src/hooks/solWalletHooks/useSolWallet";
import {
  apiGetPaymentPrice,
  apiLogin,
  apiRegisterNewUser,
} from "src/services/BEApis/auth/AuthAPIs";
import { message } from "antd";
import useUser from "src/hooks/userHooks/useUser";

const useUserAuth = () => {
  const { fnCheckWalletConnection, fnTriggerSignature, fnSignAndSendTx } =
    useSolWallet();
  const { publicKey: address } = useWallet();
  const { setFid } = useUser();
  const signatureMessage =
    "Clicking Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee.";

  const fnTriggerLogin = async () => {
    fnCheckWalletConnection();
    try {
      const signatureBase58 = await fnTriggerSignature(signatureMessage);
      const res = await apiLogin({
        signature: signatureBase58 || "",
        message: signatureMessage,
        solana_address: address?.toString() || "",
      });
      console.log("apiLogin is", res);
      localStorage.setItem("jwt", res?.data?.jwt);
      localStorage.setItem("fid", res?.data?.fid);
      setFid(res?.data?.fid);

      return res?.data;
    } catch (err) {
      console.log("Err in fnTriggerLogin", err);
      return;
    }
  };

  // Step 2 : Get Price and tx to pay
  const fnTriggerGetPriceAndSign = async () => {
    try {
      const res = await apiGetPaymentPrice();
      console.log("apiGetPaymentPrice is", res);
      const paymentDetails = await res?.data;
      console.log("paymentDetails is", paymentDetails); // Getting undefined here
      // setModalMessage(
      //   `Please Pay ${paymentDetails?.priceInSol} SOL from your wallet to continue.`
      // );
      if (paymentDetails?.message == "Account already exists") {
        return null;
      } else {
        const txSig = await fnSignAndSendTx(paymentDetails?.tx || "");
        console.log("txSig is", txSig);

        // Trigger Step 3
        if (txSig) {
          // fnTriggerRegister(txSig);
          return txSig;
        }
      }
    } catch (err) {
      console.log("Err in fnGetPriceToPay", err);
      return;
    }
  };

  // Step 3 : Register User and Update Status
  const fnTriggerRegister = async (txSig: any) => {
    try {
      const res = await apiRegisterNewUser(txSig);
      console.log("apiRegisterNewUser is", res);
      // message.success("Login Successful.");
    } catch (err) {
      console.log("Err in fnTriggerRegister", err);

      message.error((err as Error).toString());
      return;
    }
  };
  return { fnTriggerLogin, fnTriggerGetPriceAndSign, fnTriggerRegister };
};

export default useUserAuth;
