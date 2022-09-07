/*global AlgoSigner*/

import { PeraWalletConnect } from "@perawallet/connect";
// Create the PeraWalletConnect instance outside of the component
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { encodeUint64 } from 'algosdk';
import algosdk  from 'algosdk';
import { APPID } from "../constants"
import { EncodeBytes }  from "../utils"
import { ALGOD_SERVER, PORT } from "../constants"
import axios from "axios";
const peraWallet = new PeraWalletConnect();
const myAlgoWallet = new MyAlgoConnect();

const slackCall = async (message) => {
  const slackWebHookUrl = `https://hooks.slack.com/services/${process.env.REACT_APP_SLACK_HOOK}`
  const slackBody = {
    type: "mrkdwn",
    text: message
  }
  try{
    const response = await axios.post(slackWebHookUrl, JSON.stringify(slackBody), {
      withCredentials: false,
      transformRequest: [(data, headers) => {
        delete headers.post["Content-Type"]
        return data
      }]
    })
    console.log(` slack call ${response}`)

  }catch(err){

  }
}

async function appCall(caller_addr, receiver, msg, amt) {

    try {
      const token = {"X-API-Key": process.env.REACT_APP_API_KEY}
      const base_server = ALGOD_SERVER
      const port = PORT
      const algodClient = new algosdk.Algodv2(token, base_server, port);
        let suggestedParams = await algodClient.getTransactionParams().do();
        suggestedParams.fee = 2000
        suggestedParams.flatFee = true;

        let accounts = [receiver];
        let foreignApps = undefined;
        let foreignAssets = undefined;
        let appID = APPID //update
        let appArgs = [];
        let amount = +amt
        let message = msg
        let note = new TextEncoder().encode(message);
        let lease = undefined
        appArgs.push(EncodeBytes("payment"), encodeUint64(amount),);

        const paymentTransfer = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: caller_addr,
            to:  algosdk.getApplicationAddress(APPID),
            amount: algosdk.algosToMicroalgos(amount),
            note,
            suggestedParams,
          }  
        );

        const callContract = algosdk.makeApplicationNoOpTxn(
            caller_addr, 
            suggestedParams, 
            appID, 
            appArgs, 
            accounts, 
            foreignApps, 
            foreignAssets,
            note,
            lease,
            // rekeyTo
            );

        //Pera wallet integration
        // const multipleTxnGroups = [
        //   {txn: paymentTransfer, signers: [caller_addr]},
        //   {txn: callContract, signers: [caller_addr]}
        // ];

        // const signedTxn = await peraWallet.signTransaction([multipleTxnGroups]);

        
        //MyAlgowallet implementation
        const txArr = [ paymentTransfer, callContract ];
        const groupID = algosdk.computeGroupID(txArr);

        for (let i = 0; i < 2; i++) {
          txArr[i].group = groupID;
        }

        const signedTxns = await myAlgoWallet.signTransaction(txArr.map(txn => txn.toByte()));
        console.log(signedTxns)
        const response = await algodClient.sendRawTransaction(signedTxns.map(tx => tx.blob)).do();
        console.log(response)

        slackCall(`Transaction Successful \n Amount: ${amt} \n TxID: ${signedTxns[1].txID}`)

        // AlgoSigner implementation
        // algosdk.assignGroupID([paymentTransfer, callContract]);

        // const binaryTxs = [paymentTransfer.toByte(), callContract.toByte()];
        // const base64Txs = binaryTxs.map((binary) => AlgoSigner.encoding.msgpackToBase64(binary));

        // const signedTxs = await AlgoSigner.signTxn([
        // {
        //     txn: base64Txs[0],
        // },
        // {
        //     txn: base64Txs[1],
        // },
        // ]);
 
    }
    catch (err) {
        console.log("err", err);
        slackCall(`Transaction Failed \n ErrorMessage: ${JSON.stringify(err)}`)

    }
};


export default appCall;