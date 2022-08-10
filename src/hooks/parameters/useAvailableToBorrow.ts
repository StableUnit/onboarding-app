import { useContext } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { SuManagerFactory } from "utils/api";
import { SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useAvailableToBorrow = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const availableToBorrow = useParameter<BigNumber>(
        `availableToBorrow ${currency}`,
        () => SuManagerFactory.getAvailableToBorrow(currency, chainId),
        currency
    );

    return availableToBorrow ? toHRNumber(availableToBorrow, 18) : 0;
};
