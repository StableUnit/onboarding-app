import { useContext } from "react";

import { StateContext } from "reducer/constants";
import { SuVaultFactory } from "utils/api";
import { getAddress, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useFee = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const tokenAddress = getAddress(currency, chainId);
    const feeBN = useParameter(`fee ${currency}`, () => SuVaultFactory.calculateFeeE18(tokenAddress), tokenAddress);

    return {
        feeBN,
        fee: feeBN ? toHRNumber(feeBN, 18) : 0,
    };
};
