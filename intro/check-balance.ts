import { Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {
    getDomainKeySync
} from "@bonfida/spl-name-service";

const publicKey = new PublicKey("3mHXRQa5AUGt4PYtJ93yT4A7axqtTeEPJekuKfnkufuh");
const connection = new Connection("https://api.devnet.solana.com","confirmed");
const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSol}!`,
)

// new connection to mainnet

const mainConnection = new Connection("https://api.mainnet-beta.solana.com","confirmed");

const domains_to_check = [
    "toly.sol",
    "shaq.sol",
    "mccann.sol",
    ];

for (const domain of domains_to_check){
    // convert SNS to public key
    const { pubkey } = getDomainKeySync(domain);

    const balanceInLamports = await mainConnection.getBalance(pubkey);

    const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
        `💰 Finished! The balance for the wallet at address ${domain} is ${balanceInSol}!`,
    )
}