import Web3 from "web3";

import CONTRACT_ERC20 from "contracts/ERC20.json";
import { getAddress, getDecimals, SupportedTokensType } from "./currency";
import { fromHRNumber } from "./bigNumber";

let currentAddress: string;
export const setUtilsCurrentAddress = (newAddress: string) => {
    currentAddress = newAddress;
};

let web3: Web3;
export const setUtilsWeb3 = (newWeb3: Web3) => {
    web3 = newWeb3;
};

export const CommonFactory = {
    createCurrencyContract: (address: string) => {
        if (web3 && address) {
            return new web3.eth.Contract(CONTRACT_ERC20 as any, address);
        }
        return undefined;
    },
    mint: async (tokenName: SupportedTokensType, amount: number, chainId: number | undefined) => {
        if (currentAddress) {
            const amountBN = fromHRNumber(amount, getDecimals(tokenName, chainId) as number);
            const tokenContract = CommonFactory.createCurrencyContract(getAddress(tokenName, chainId) as string);
            return tokenContract?.methods.mint(currentAddress, amountBN.toString(10)).send({ from: currentAddress });
        }

        return undefined;
    },
};
