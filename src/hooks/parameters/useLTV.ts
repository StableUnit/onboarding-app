import { useContext } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { SupportedTokensType } from "utils/currency";
import { SuManagerFactory } from "utils/api";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useLTV = (currency: SupportedTokensType, amount: number) => {
    const { chainId } = useContext(StateContext);
    const ltvBN = useParameter<BigNumber>(
        `LTVE18 ${currency}`,
        () => SuManagerFactory.getLTVE18(currency, chainId),
        currency
    );

    return {
        ltv: ltvBN ? toHRNumber(ltvBN, 18) : 0,
    };
};
