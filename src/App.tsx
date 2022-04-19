import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Rinkeby, useContractFunction, useEthers, useTokenBalance } from '@usedapp/core';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { Contract, utils } from 'ethers';

const L1_ADDRESS = '0xa1d98b73f72eeae96ddda27d2140fdbb0d967c09';
const L2_ADDRESS = '0x382d30f43a2197f3d84322d78442110724328558';

const ERC20_INTERFACE = new utils.Interface([
  'function mint(address _to, uint256 _value)'
]);

function App() {
  const { account, activateBrowserWallet, deactivate, chainId } = useEthers()
  const address = chainId === Rinkeby.chainId ? L1_ADDRESS : L2_ADDRESS
  const balance = useTokenBalance(address, account)
  const { send, state } = useContractFunction(new Contract(address, ERC20_INTERFACE), 'mint')
  const [mintAmount, setMintAmount] = useState('1')
  return (
    <div className="App">
      <div>Account: {account?.toString()}</div>
      <div>Chain Id: {chainId}</div>
      <div>Contract address {address}</div>
      <div>
        <button onClick={activateBrowserWallet}>Activate Browser Wallet</button>
        <button onClick={deactivate}>Deactivate</button>
      </div>
      <hr/>
      <div>
        Balance: {balance ? formatEther(balance) : 'Loading...'}
      </div>
      <hr/>
      <div>
        <input type="text" value={mintAmount} onChange={e => setMintAmount(e.target.value)} />
        <button onClick={() => send(account, parseEther(mintAmount))}>Mint</button>
        <div>{state.status.toString()}</div>
        <div>{state.errorMessage ?? ''}</div>
      </div>
    </div>
  );
}

// https://rinkeby.etherscan.io/tx/0xda6dacf3e157ffc662c2de4aef257351433d0c53a3c1ebf34ef02a94f2f7efc7
// https://rinkeby-explorer.arbitrum.io/tx/0x9dcd528b7a389a262390e94bee737811ab8be78677226ab23a6e44b69bdca216

export default App;
