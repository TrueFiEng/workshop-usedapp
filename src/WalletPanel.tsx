import { useContractFunction, useEthers, useTokenBalance } from "@usedapp/core"
import { Contract } from "ethers"
import { formatEther, parseEther } from "ethers/lib/utils"
import { useState } from "react"
import { ERC20_INTERFACE } from "./interface"

export interface WalletPanelProps {
  networkChainId: number
  tokenAddress: string
  networkName: string
}

export const WalletPanel: React.FC<WalletPanelProps> = ({ networkChainId, tokenAddress, networkName }) => {
  const { account, chainId: currentChainId, switchNetwork } = useEthers();

  const balance = useTokenBalance(tokenAddress, account, { chainId: networkChainId });

  const [mintAmount, setMintAmount] = useState('1')
  const { send, state, resetState } = useContractFunction(new Contract(tokenAddress, ERC20_INTERFACE), 'mint')

  function handleMint() {
    if(currentChainId !== networkChainId) {
      switchNetwork(networkChainId);
    } else {
      send(account, parseEther(mintAmount));
    }
  }

  console.log({ networkName, balance, account, tokenAddress, networkChainId, currentChainId })

  return (
    <div>
      <h4>{networkName}</h4>
      <div>Chain ID: {networkChainId}</div>
      <hr/>
      <div>Balance: {balance ? formatEther(balance) : undefined}</div>
      <hr/>
      {state.status === 'None' ? (
        <>
          <input type="text" value={mintAmount} onChange={e => setMintAmount(e.target.value)} />
          <button onClick={handleMint}>{currentChainId !== networkChainId ? 'Switch network' : 'Mint'}</button>
        </>
      ) : (
        <>
          <div>{state.status}</div>
          {state.errorMessage && <div>{state.errorMessage}</div>}
          <button onClick={resetState}>Reset</button>
        </>
      )}
    </div>
  )
}