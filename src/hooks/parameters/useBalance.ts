import { useCallback, useContext, useEffect, useState } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { CommonFactory } from "utils/api";
import { getAddress, getDecimals, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

export const useBalance = (currency: SupportedTokensType, showBalance = true) => {
    const { chainId, currentAddress } = useContext(StateContext);
    const [balanceBN, setBalanceBN] = useState(new BigNumber(0));
    const decimals = getDecimals(currency, chainId);
    const tokenAddress = getAddress(currency, chainId);

    const updateParameter = useCallback(async () => {
        if (currentAddress && chainId) {
            try {
                const newResult = await CommonFactory.balance(tokenAddress);
                setBalanceBN(newResult);
            } catch (e) {
                setBalanceBN(new BigNumber(0));
            }
        }
    }, [currentAddress, chainId]);

    useEffect(() => {
        updateParameter();
    }, [updateParameter]);

    return {
        balanceBN,
        balance: decimals && balanceBN ? toHRNumber(balanceBN, decimals) : 0,
    };
};
