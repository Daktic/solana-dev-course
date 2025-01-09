import {useEffect, useState} from "react";

import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {LAMPORTS_PER_SOL, Keypair, Transaction, SystemProgram, PublicKey} from "@solana/web3.js";

import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    getMinimumBalanceForRentExemptMint,
    createInitializeMintInstruction,
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction
} from '@solana/spl-token';




const TokenApp = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [txLogs, setTxLogs] = useState<string[]>([])
    const [solBalance, setSolBalance] = useState(0);
    const [mintAddress, setMintAddress] = useState(PublicKey.default);
    const [tokenAccountAddress, setTokenAccountAddress] = useState(PublicKey.default);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [recepientAddress, setRecepientAddress] = useState(PublicKey.default);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if (!publicKey) return;
        const fetchSolBalance = async () => {
            const lamportBalance = await connection.getBalance(publicKey);
            const solBalance = lamportBalance / LAMPORTS_PER_SOL
            setSolBalance(solBalance);
        }


        fetchSolBalance();
    }, [publicKey]);

    const createMint = async (event: any) => {
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

        const sig = await sendTransaction(transaction, connection, {signers: [mint]});
        setTxLogs(
            txLogs.concat([
                `Created Mint: ${mint.publicKey.toString()}`,
                `Mint Signature: ${sig}`,
            ]))
        setMintAddress(mint.publicKey);
    };

    const transaction = new Transaction();

    const createTokenAccount = async (event: any) => {
        event.preventDefault();
        if (!connection || !publicKey) {
            return;
        }

        const associatedTokenAddress = await getAssociatedTokenAddress(
            mintAddress,
            publicKey,
            false,
        );

        // create token account pda
        const createTokenAccount = createAssociatedTokenAccountInstruction(
            publicKey,
            associatedTokenAddress,
            publicKey,
            mintAddress,
        );

        transaction.add(createTokenAccount);

        const sig = await sendTransaction(transaction, connection);
        setTxLogs(
            txLogs.concat([
                `Created PDA: ${associatedTokenAddress}`,
                `PDA Signature: ${sig}`,
            ]))
        setTokenAccountAddress(associatedTokenAddress);
    }

    const handleRecepientChange = (event: any) => {
        setRecepientAddress(event.target.value);
    }
    const handleAmountChange = (event: any) => {
        if (event.target.value === '') {
            setAmount(0);
        }
        if (event.target.value < 0) {
            setAmount(0);
        }
        setAmount(event.target.value);
    }

    const MintToken = async (event: any) => {
        event.preventDefault();
        if (!connection || !publicKey) {
            return;
        }


    }

    return (
        <div>
            <h3>Logs</h3>
            <div
                style={{overflowY: 'scroll', height: '100px', backgroundColor: 'black', color: 'green'}}>

                {txLogs.map((log, index) => <p key={index}>{log}</p>)}
            </div>
            <h2>SOL Balance <span>{solBalance}</span></h2>
            <button onClick={createMint} disabled={mintAddress !== PublicKey.default}>Create Mint</button>
            <br/>
            <h2>Token Mint:</h2>
            {mintAddress !== PublicKey.default && <p>{mintAddress.toString()}</p>}
            <h2>Token Account Owner:</h2>
            {tokenAccountAddress !== PublicKey.default && <p>{tokenAccountAddress.toString()}</p>}
            <button onClick={createTokenAccount} disabled={tokenAccountAddress !== PublicKey.default}>Create Token Account</button>
            <br/>
            <h2>Recipient</h2>
            <input placeholder={"Address"} onChange={handleRecepientChange}></input>
            <h2>Amount Tokens to Mint</h2>
            <input type="number" onChange={handleAmountChange} value={amount}/>
            <button>Mint Tokens</button>
            <br/>
            <h2>Token Balance: {tokenBalance}</h2>
        </div>
    )
}

export { TokenApp}