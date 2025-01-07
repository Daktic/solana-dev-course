import {useEffect, useState} from "react";

import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {LAMPORTS_PER_SOL, Keypair, Transaction, SystemProgram} from "@solana/web3.js";

import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    getMinimumBalanceForRentExemptMint,
    createInitializeMintInstruction,
} from '@solana/spl-token';




const TokenApp = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [solBalance, setSolBalance] = useState(0);
    const [mintAddress, setMintAddress] = useState("");
    const [tokenAccountAddress, setTokenAccountAddress] = useState("");
    const [tokenBalance, setTokenBalance] = useState(0);

    useEffect(() => {
        if (!publicKey) return;
        const fetchSolBalance = async () => {
            const lamportBalance = await connection.getBalance(publicKey);
            const solBalance = lamportBalance / LAMPORTS_PER_SOL
            setSolBalance(solBalance);
        }


        fetchSolBalance();
    }, [publicKey]);

    const mintToken = async (event: any) => {
        event.preventDefault();
        if (!connection || !publicKey) {
            return;
        }

        const mint = Keypair.generate();

        const lamports = await getMinimumBalanceForRentExemptMint(connection);

        const transaction = new Transaction();

        transaction.add(
            SystemProgram.createAccount({
                fromPubkey: publicKey,
                newAccountPubkey: mint.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMintInstruction(
                mint.publicKey,
                0,
                publicKey,
                publicKey,
                TOKEN_PROGRAM_ID
            )
        );

        sendTransaction(transaction, connection, {
            signers: [mint],
        }).then((sig) => {
            console.log(sig);
            setMintAddress(mint.publicKey.toString());
        });
    };

    return (
        <div>
            <h2>SOL Balance <span>{solBalance}</span></h2>
            <button onClick={mintToken}>Create Mint</button>
            <br/>
            <h2>Token Mint:</h2>
            <p>{mintAddress}</p>
            <h2>Token Account Owner:</h2>
            <p>input todo</p>
            <button>Create Token Account</button>
            <br/>
            <h2>Token Mint:</h2>
            <p>input todo</p>
            <h2>Recipient</h2>
            <p>input todo</p>
            <h2>Amount Tokens to Mint</h2>
            <p>input todo</p>
            <button>Mint Tokens</button>
            <br/>
            <h2>Token Balance: {tokenBalance}</h2>
        </div>
    )
}

export { TokenApp}