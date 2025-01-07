import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

const tokenMintAccount = new PublicKey("DDiEvexVeNWNgFwGHXDHVHanGjzsgi2mdrjnuR9m4G5c");

const recipient = new PublicKey(user.publicKey.toBase58());

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient,
)

console.log(`✅ Token account created! You can view it on Solana Explorer here: ${getExplorerLink("address", tokenAccount.address.toBase58(), "devnet")}`);

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
);

console.log(`🌿 Token account created! You can view it on Solana Explorer here: ${link}`);