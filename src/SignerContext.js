import { createContext, useState } from "react";

const SignerContext = createContext(null);

const SignerProvider = ({ children }) => {
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  return (
    <SignerContext.Provider value={{ signer, setSigner, account, setAccount }}>
      {children}
    </SignerContext.Provider>
  );
};

export { SignerContext, SignerProvider };
