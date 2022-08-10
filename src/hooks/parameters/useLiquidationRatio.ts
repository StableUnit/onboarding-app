import { useContext } from "react";

import { StateContext } from "reducer/constants";
import { SuManagerFactory } from "utils/api";
import { getAddress, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useLiquidationRatio = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const tokenAddress = getAddress(currency, chainId);
    const liquidationRatioBN = useParameter(
        `liquidationRatio ${currency}`,
        () => SuManagerFactory.getLiquidationRatio(tokenAddress),
        tokenAddress
    );

    return {
        liquidationRatioBN,
        liquidationRatio: liquidationRatioBN ? toHRNumber(liquidationRatioBN?.multipliedBy(100), 18) : 0,
    };
};
