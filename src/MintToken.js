import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import { SignerContext } from "./SignerContext";
import { contractAddress, contractABI } from './config';
import "./MintToken.css";

const MintToken = () => {
    const { signer, account } = useContext(SignerContext);
    const [tokenURI, setTokenURI] = useState("");
    const [status, setStatus] = useState("");

    const mintNFT = async (tokenURI) => {
        try {
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const tx = await contract.mintNFT(account, tokenURI);
            await tx.wait();
            setStatus("NFT successfully minted!");
        } catch (error) {
            setStatus("Error: ", error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!signer) {
            setStatus("Please connect your wallet first.");
            return;
        }
        mintNFT(tokenURI);
    };

    return (
        <div>
            <p>Mint an NFT token</p>
            {account &&
                <form onSubmit={handleSubmit} className="mint-token-form">
                    <input
                        type="text"
                        placeholder="Token URI"
                        value={tokenURI}
                        onChange={(event) => setTokenURI(event.target.value)}
                        required
                        className="mint-token-input"
                    />
                    <button type="submit" className="mint-token-button">
                        mint NFT
                    </button>
                </form>
            }
            {status && <p>{status}</p>}
        </div>
    );
};

export default MintToken;
