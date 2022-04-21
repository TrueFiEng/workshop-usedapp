import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Config, Mainnet, Arbitrum, DAppProvider, Rinkeby, ArbitrumRinkeby } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const config: Config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    [Rinkeby.chainId]: 'https://rinkeby.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
    [ArbitrumRinkeby.chainId]: 'https://rinkeby.arbitrum.io/rpc',
  },
}

root.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
