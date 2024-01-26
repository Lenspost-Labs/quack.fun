import React from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  apiGetPaymentPrice,
  apiLogin,
  apiRegisterNewUser,
} from "../../../services/BEApis/auth/AuthAPIs";

import { Button, message } from "antd";
import base58 from "bs58";
import { Transaction, VersionedTransaction , Connection } from "@solana/web3.js";

export const UtilLoginToApp = () => {
  const {
    publicKey: address,
    signMessage,
    connected,
    signTransaction,
    sendTransaction,
  } = useWallet();
  // const { connection } = useConnection();
  const [signatureMessage, setSignatureMessage] = React.useState<string>(
    "Clicking Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee."
  );
  const [paymentDetails, setPaymentDetails] = React.useState<any>({
    price: 0,
    priceInSol: 0,
    priceInUSDC: 0,
    tx: "",
  });

  // fn to check if wallet is connected
  const fnCheckWalletConnection = () => {
    if (!connected) {
      message.error("Please connect your wallet");
      return;
    }
  };

  // fn to trigger signature
  const fnTriggerSignature = async (signInMessage: string) => {
    fnCheckWalletConnection();

    let signatureUint8, signatureBase58;
    if (signMessage) {
      signatureUint8 = await signMessage(
        new TextEncoder().encode(signInMessage)
      );
      console.log("signatureUint8 is", signatureUint8);
      signatureBase58 = base58.encode(signatureUint8 as Uint8Array);
      console.log("signatureBase58 is", signatureBase58);
    }
    return signatureBase58;
  };
  // fn to get raw transaction
  const fnGetRawTransaction = (encodedTx: string) => {
    let recoveredTx;
    try {
      recoveredTx = Transaction.from(Buffer.from(encodedTx, "base64"));
      console.log("recoveredTx serialized is", recoveredTx);
    } catch (e) {
      recoveredTx = VersionedTransaction.deserialize(
        Buffer.from(encodedTx, "base64")
      );

      console.log("recoveredTx deserialized is", recoveredTx);
    }
    return recoveredTx;
  };

  const fnSignTx = async (txBase64: string) => {
    const recoveredTx = fnGetRawTransaction(txBase64);
    const connection = new Connection("")
    if (signTransaction) {
      const signedTxOutput = await sendTransaction(recoveredTx, connection);
      return signedTxOutput;
    } else {
      console.log("signTransaction is not available");
      return null;
    }
  };

  // Step 1 : Login user Wallet
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
    // fnSignTx(res?.data?.tx || "");

    // Trigger Step 2
    fnGetPriceToPay();
  };

  // Step 2 : Get Price and tx to pay
  const fnGetPriceToPay = async () => {
    try {
      const res = await apiGetPaymentPrice();
      console.log("apiGetPaymentPrice is", res);
      setPaymentDetails((await res?.data) || {});
      console.log("paymentDetails is", paymentDetails); // Getting undefined here
    } catch (err) {
      console.log("Err in fnGetPriceToPay", err);
    }

    const txSig = await fnSignTx(paymentDetails?.tx || "");
    console.log("txSig is", txSig);

    // Trigger Step 3
    if (txSig) {
      fnTriggerRegister(txSig);
    }
  };

  // Step 3 : Register User and Update Status
  const fnTriggerRegister = async (txSig: any) => {
    const res = await apiRegisterNewUser(txSig);
    console.log("apiRegisterNewUser is", res);
  };

  return (
    <>
      <Button onClick={fnTriggerLogin}>Login</Button>
      {/* <Button onClick={fnTriggerRegister}>Register</Button> */}
    </>
  );
};
