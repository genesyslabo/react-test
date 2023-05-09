import React, { useState, useEffect, useContext } from 'react';
import './ConnectWalletMobile.css';
import { SignerContext } from './SignerContext';

const ConnectWalletMobile = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { setAccount } = useContext(SignerContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accountFromUrl = urlParams.get('account');

    if (accountFromUrl) {
      setResult(accountFromUrl);
      setAccount(accountFromUrl);
    }

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        setResult(accounts[0]);
        setAccount(accounts[0]);
      });
    }
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

        const currentUrl = new URL(window.location);
        currentUrl.searchParams.set('account', accounts[0]);
        window.location.assign(currentUrl.toString());
      } else {
        const metamaskDeepLink = 'https://metamask.app.link/dapp/genesyslabo.github.io/react-test/';

        if (navigator.userAgent.includes('iPhone')) {
          window.location.assign(metamaskDeepLink);
        } else if (navigator.userAgent.includes('Android')) {
          const intentUri = 'intent://genesyslabo.github.io/react-test/#Intent;scheme=metamask;package=io.metamask;end';
          window.location.assign(intentUri);
        } else {
          window.location.assign(metamaskDeepLink);
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
