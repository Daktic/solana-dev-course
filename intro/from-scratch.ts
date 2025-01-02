import * as web3 from "@solana/web3.js";
import "dotenv/config";

import {
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {SystemProgram} from "@solana/web3.js";

const payer = getKeypairFromEnvironment("SECRET_KEY");

const suppliedToPublicKey = process.argv[2] || null;

if (!suppliedToPublicKey) {
    console.log("Please provide a public key to send to");
    process.exit(1);
}

const connection = new web3.Connection("https://api.devnet.solana.com");

const transaction = new web3.Transaction();

const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: new web3.PublicKey(suppliedToPublicKey),
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer],
);

console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
);