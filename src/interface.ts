import { utils } from "ethers";

export const ERC20_INTERFACE = new utils.Interface([
  'function mint(address _to, uint256 _value)'
]);