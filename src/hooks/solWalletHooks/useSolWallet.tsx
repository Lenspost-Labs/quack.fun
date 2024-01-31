import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { message } from "antd";
import base58 from "bs58";
import { Transaction, VersionedTransaction } from "@solana/web3.js";

const useSolWallet = () => {
  const { connected, signMessage, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const fnCheckWalletConnection = () => {
    if (!connected) {
      message.error("Please connect your wallet");
      return;
    }
  };

  const fnTriggerSignature = async (signInMessage: string) => {
    fnCheckWalletConnection();

    try {
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
    } catch (error) {
      console.log("Error in fnTriggerSignature", error);
      message.error((error as Error).toString());
      return null;
    }
  };

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

  const fnSignAndSendTx = async (txBase64: string) => {
    try {
      const recoveredTx = fnGetRawTransaction(txBase64);
      console.log("recoveredTx is", recoveredTx);
      if (sendTransaction && recoveredTx) {
        const signedTxOutput = await sendTransaction(recoveredTx, connection);
        return signedTxOutput;
      } else {
        // setModalMessage(" Sign transaction not available ");
        console.log("sendTransaction is not available");
        return null;
      }
    } catch (error) {
      console.log("IN fnSignAndSendTx - ERROR");
      console.log(error);

      message.error((error as Error).toString());
      return null;
    }
  };

  return {
    fnCheckWalletConnection,
    fnTriggerSignature,
    fnGetRawTransaction,
    fnSignAndSendTx,
  };
};

export default useSolWallet;
