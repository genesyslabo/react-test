import React, { useState, useEffect, useContext } from 'react';
import './ConnectWalletMobile.css';
import { SignerContext } from './SignerContext';

const ConnectWalletMobile = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { setAccount } = useContext(SignerContext);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'ACCOUNT_CONNECTED') {
        setResult(event.data.account);
        setAccount(event.data.account);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [setAccount]);

  const connectWallet = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        // Connect to wallet directly if in MetaMask mobile browser
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setResult(accounts[0]);
        setAccount(accounts[0]);
      } else {
        const connectorUrl = "https://genesyslabo.github.io/react-test/metamask-connector.html";

        if (navigator.userAgent.includes('iPhone')) {
          window.location.assign(connectorUrl);
        } else if (navigator.userAgent.includes('Android')) {
          const intentUri = `intent://${connectorUrl}#Intent;scheme=http;package=io.metamask;end`;
          window.location.assign(intentUri);
        } else {
          window.open(connectorUrl, '_blank');
        }
      }
    } catch (error) {
      console.error(error);
      setError('Failed to connect to your wallet.');
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <p>{result ? `Connected to ${result}` : 'Connect your wallet (mobile)'}</p>
      {!result && (
        <button className="connect-wallet-button" onClick={connectWallet}>
          Connect
        </button>
      )}
    </div>
  );
};

export default ConnectWalletMobile;
