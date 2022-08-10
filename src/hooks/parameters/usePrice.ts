import { useCallback, useContext, useEffect, useState } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { SuMockOracleContract } from "utils/api";
import { getAddress, getDecimals, SupportedTokensType } from "utils/currency";
import { BN_1E18, getHRPriceUSD } from "utils/bigNumber";

export const usePrice = (currency: SupportedTokensType) => {
    const { currentAddress, chainId } = useContext(StateContext);
    const [price, setPrice] = useState(new BigNumber(0));
    const tokenAddress = getAddress(currency, chainId);
    const decimals = getDecimals(currency, chainId);

    const updatePrice = useCallback(async () => {
        if (currentAddress) {
            const newPrice = await SuMockOracleContract.getUsdPrice1e18(tokenAddress);
            if (newPrice !== undefined) {
                setPrice(newPrice.div(BN_1E18));
            }
        }
    }, [currentAddress, tokenAddress]);

    useEffect(() => {
        updatePrice();
    }, [updatePrice]);

    return {
        tokenPriceE18: price,
        tokenPrice: decimals ? getHRPriceUSD(1, price, decimals) : 0,
    };
};
