import logo from './logo.svg';
import './App.css';
import ConnectWallet from './ConnectWallet';
import MintToken from './MintToken';
import { SignerProvider } from "./SignerContext";

function App() {
  return (
    <SignerProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ConnectWallet />
          <MintToken />
        </header>
      </div>
    </SignerProvider>
  );
}

export default App;
