import React, { useState, useEffect, useContext } from 'react';
import './ConnectWalletMobile.css';
import { Web3Provider } from '@ethersproject/providers';
import { SignerContext } from './SignerContext';

const ConnectWalletMobile = () => {
  const [provider, setProvider] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { setAccount, setSigner } = useContext(SignerContext);

  useEffect(() => {
    const initEthersProvider = async () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', (accounts) => {
          setResult(accounts[0]);
          setAccount(accounts[0]);
        });

        setProvider(new Web3Provider(window.ethereum));

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setResult(accounts[0]);
          setAccount(accounts[0]);
        }
      }
    };
    initEthersProvider();
  }, [setAccount]);

  const connectWallet = async () => {
    try {
      if (!provider) return;

      const metamaskDeepLink = 'https://metamask.app.link/dapp/genesyslabo.github.io/react-test/';

      if (navigator.userAgent.includes('iPhone')) {
        window.location.assign(metamaskDeepLink);
      } else if (navigator.userAgent.includes('Android')) {
        const intentUri = 'intent://genesyslabo.github.io/react-test/#Intent;scheme=metamask;package=io.metamask;end';
        window.location.assign(intentUri);
      } else {
        window.location.assign(metamaskDeepLink);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to connect to your wallet.');
    }
  };

  return (
    <div>
      {!provider && <p>Please install an ethers extension like MetaMask</p>}
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
