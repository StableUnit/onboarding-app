import { useContext } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { SuVaultFactory } from "utils/api";
import { getAddress, getDecimals, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useDeposited = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const tokenAddress = getAddress(currency, chainId);
    const decimals = getDecimals(currency, chainId);
    const depositedBN = useParameter("deposit", () => SuVaultFactory.getDeposited(tokenAddress), tokenAddress);

    return {
        depositedBN: depositedBN ?? new BigNumber(0),
        deposited: depositedBN && decimals ? toHRNumber(depositedBN, decimals) : 0,
    };
};
