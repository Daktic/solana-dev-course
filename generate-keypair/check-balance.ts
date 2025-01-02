import { Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

const publicKey = new PublicKey("3mHXRQa5AUGt4PYtJ93yT4A7axqtTeEPJekuKfnkufuh");
const connection = new Connection("https://api.devnet.solana.com","confirmed");
const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSol}!`,
)