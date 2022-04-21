import { ArbitrumRinkeby, Rinkeby, useEthers } from '@usedapp/core';
import React from 'react';
import './App.css';
import { WalletPanel } from './WalletPanel';

const L1_ADDRESS = '0xa1d98b73f72eeae96ddda27d2140fdbb0d967c09';
const L2_ADDRESS = '0x382d30f43a2197f3d84322d78442110724328558';

function App() {
  const { account, chainId, activateBrowserWallet } = useEthers()
  return (
    <div className="App">
      <div>Account: {account?.toString()}</div>
      <div>Chain Id: {chainId}</div>
      {account ? (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row' }}>
          <WalletPanel networkName="Rinkeby" networkChainId={Rinkeby.chainId} tokenAddress={L1_ADDRESS} />
          <WalletPanel networkName="Arbitrum Rinkeby" networkChainId={ArbitrumRinkeby.chainId} tokenAddress={L2_ADDRESS} />
        </div>
      ) : (
        <button onClick={activateBrowserWallet}>Connect account</button>
      )}
    </div>
  );
}

// https://rinkeby.etherscan.io/tx/0xda6dacf3e157ffc662c2de4aef257351433d0c53a3c1ebf34ef02a94f2f7efc7
// https://rinkeby-explorer.arbitrum.io/tx/0x9dcd528b7a389a262390e94bee737811ab8be78677226ab23a6e44b69bdca216
// https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods
// https://rinkebyfaucet.com/
// https://bridge.arbitrum.io/

export default App;
