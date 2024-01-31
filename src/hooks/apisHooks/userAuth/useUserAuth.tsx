import { useWallet } from "@solana/wallet-adapter-react";
import useSolWallet from "src/hooks/solWalletHooks/useSolWallet";
import {
  apiGetPaymentPrice,
  apiLogin,
  apiRegisterNewUser,
} from "src/services/BEApis/auth/AuthAPIs";
import { message } from "antd";

const useUserAuth = () => {
  const { fnCheckWalletConnection, fnTriggerSignature, fnSignAndSendTx } =
    useSolWallet();
  const { publicKey: address } = useWallet();
  const signatureMessage =
    "Clicking Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee.";

  const fnTriggerLogin = async () => {
    fnCheckWalletConnection();

    const signatureBase58 = await fnTriggerSignature(signatureMessage);
    const res = await apiLogin({
      signature: signatureBase58 || "",
      message: signatureMessage,
      solana_address: address?.toString() || "",
    });
    console.log("apiLogin is", res);
    localStorage.setItem("jwt", res?.data?.jwt);
    return res?.data;

    // fnSignAndSendTx(res?.data?.tx || "");

    // // Trigger Step 2
    // setModalMessage("Please wait while we get the price to pay.");
    // fnGetPriceToPay();
  };

  // Step 2 : Get Price and tx to pay
  const fnGetPriceAndSign = async () => {
    try {
      const res = await apiGetPaymentPrice();
      console.log("apiGetPaymentPrice is", res);
      const paymentDetails = await res?.data;
      console.log("paymentDetails is", paymentDetails); // Getting undefined here
      //   setModalMessage(
      //     `Please Pay ${paymentDetails?.priceInSol} SOL from your wallet to continue.`
      //   );
      const txSig = await fnSignAndSendTx(paymentDetails?.tx || "");
      console.log("txSig is", txSig);

      // Trigger Step 3
      if (txSig) {
        // fnTriggerRegister(txSig);
        return txSig;
      }
    } catch (err) {
      console.log("Err in fnGetPriceToPay", err);
      return;
    }
  };

  // Step 3 : Register User and Update Status
  const fnTriggerRegister = async (txSig: any) => {
    try {
      // setModalMessage("Please wait while we register your wallet.");
      const res = await apiRegisterNewUser(txSig);
      console.log("apiRegisterNewUser is", res);

      // setHasUserLoggedIn(true);
      // setModalMessage("Thank you for joining Quack! 🎉");

      // setIsOnboardingModalOpen(false);
      message.success("Login Successful.");
    } catch (err) {
      console.log("Err in fnTriggerRegister", err);

      message.error((err as Error).toString());
      // setIsOnboardingModalOpen(false);
      return;
    }
  };
  return { fnTriggerLogin, fnGetPriceAndSign, fnTriggerRegister };
};

export default useUserAuth;
