import { PeraWalletConnect } from "@perawallet/connect";
import MyAlgoConnect from '@randlabs/myalgo-connect';

import algosdk  from 'algosdk';
import { APPID } from "../constants"
const peraWallet = new PeraWalletConnect();

const myAlgoWallet = new MyAlgoConnect();

// Create the PeraWalletConnect instance outside of the component

async function optin(caller_addr) {

    try {
      const token = {"X-API-Key": process.env.REACT_APP_API_KEY}
      const base_server = process.env.REACT_APP_ALGOD_SERVER
      const port = process.env.REACT_APP_PORT
      const algodClient = new algosdk.Algodv2(token, base_server, port);
      let params = await algodClient.getTransactionParams().do();
      params.fee = 1000
      params.flatFee = true;

      // const mnemonic = sender
      // let caller = algosdk.mnemonicToSecretKey(mnemonic);
      // let caller_addr = caller.addr;

      let txn = algosdk.makeApplicationOptInTxn(caller_addr, params, APPID);
      let txId = txn.txID().toString();
      // sign, send, await
      // Sign the transaction
      // let signedTxn = txn.signTxn(caller.sk);
      const singleTxnGroups = [{txn: txn, signers: [caller_addr]}];

      // let signedTxn = await peraWallet.signTransaction([singleTxnGroups])
      // console.log("Signed transaction with txID: %s", txId);

      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());  
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
      console.log(response)
      // // Submit the transaction
      // await algodClient.sendRawTransaction(signedTxn).do()                           
      //     // Wait for transaction to be confirmed
      //   const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
      //     console.log("confirmed" + confirmedTxn)

      //     //Get the completed Transaction
      //     console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
      //     // display results
      // let transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
      // console.log("Opted-in to app-id:",transactionResponse['txn']['txn']['apid'])
  }catch(err){
    console.log("Couldn't sign Opt-in txns", err)
  }
};

export default optin;