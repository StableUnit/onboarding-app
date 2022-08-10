import { useContext } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { getDecimals, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";
import { SuManagerFactory } from "utils/api";

import { useParameter } from "./useParameter";

export const useAvailableToWithdraw = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const decimals = getDecimals(currency, chainId);
    const availableToWithdrawBN = useParameter<BigNumber>(
        `availableToWithdraw ${currency}`,
        () => SuManagerFactory.getAvailableToWithdraw(currency, chainId),
        currency
    );

    return {
        availableToWithdrawBN,
        availableToWithdraw: availableToWithdrawBN && decimals ? toHRNumber(availableToWithdrawBN, decimals) : 0,
    };
};
