import React, { useState, useEffect, useContext } from "react";
import "./ConnectWallet.css";
import { Web3Provider } from "@ethersproject/providers";
import { SignerContext } from "./SignerContext";

const ConnectWallet = () => {
    const [provider, setProvider] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const { setAccount, setSigner } = useContext(SignerContext);

    useEffect(() => {
        const initEthersProvider = () => {
            if (typeof window.ethereum !== "undefined") {
                setProvider(new Web3Provider(window.ethereum));
            }
        };
        initEthersProvider();
    }, []);

    const connectWallet = async () => {
        try {
            if (!provider) return;
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setResult(accounts[0]);
            setAccount(accounts[0]);
            setSigner(provider.getSigner());
        } catch (error) {
            console.error(error);
            setError("Failed to connect to your wallet.");
        }
    };
    return (
        <div>
            {!provider && <p>Please install an ethers extension like MetaMask</p>}
            {error && <p>{error}</p>}
            <p>{result ? `Connect to ${result}` : "Connect your wallet"}</p>
            {!result && (
                <button
                    className="connect-wallet-button"
                    onClick={connectWallet}
                >
                    connect
                </button>
            )}
        </div>
    );
};

export default ConnectWallet;
