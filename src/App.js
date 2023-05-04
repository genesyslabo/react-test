import logo from './logo.svg';
import './App.css';
import ConnectWalletWeb from './ConnectWalletWeb';
import ConnectWalletMobile from './ConnectWalletMobile';
// import MintToken from './MintToken';
import { SignerProvider } from "./SignerContext";

function App() {
  const isLargeScreen = window.innerWidth >= 600;

  return (
    <SignerProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {isLargeScreen ? <ConnectWalletWeb /> : <ConnectWalletMobile />}
          {/* <MintToken /> */}
        </header>
      </div>
    </SignerProvider>
  );
}

export default App;
