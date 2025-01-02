import {
    Connection,
    Transaction,
    SystemProgram,
    PublicKey, sendAndConfirmTransaction
} from "@solana/web3.js";
import "dotenv/config";
import {getKeypairFromEnvironment} from "@solana-developers/helpers";

const suppliedToPublicKey = process.argv[2] || null;

if (!suppliedToPublicKey) {
    console.log("Please provide a public key to send to");
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPublicKey}`);

const toPubkey = new PublicKey(suppliedToPublicKey);

const connection = new Connection("https://api.devnet.solana.com","confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
)

const transaction = new Transaction();

// If the account you send to does not meet rent exception, the transaction will fail.
// either fund the recipient account above rent exception or increase lamports to exceed rent exception
const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey: toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [senderKeypair],
);

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature}!`);