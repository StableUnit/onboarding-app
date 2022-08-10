import { useContext } from "react";

import BigNumber from "bignumber.js";
import { StateContext } from "reducer/constants";
import { SuManagerFactory } from "utils/api";
import { SupportedTokensType } from "utils/currency";
import { BN_1E18, toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

type ReturnType = {
    liquidationPriceBN: BigNumber;
    liquidationPrice: number | "inf";
};

export const useLiquidationPrice = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const liquidationPriceBN = useParameter(
        `liquidationPrice ${currency}`,
        () => SuManagerFactory.getLiquidationPrice(currency, chainId),
        currency
    );

    const liquidationPrice = liquidationPriceBN ? toHRNumber(liquidationPriceBN, 18) : 0;

    return {
        liquidationPriceBN: liquidationPriceBN?.div(BN_1E18),
        liquidationPrice: liquidationPriceBN && liquidationPriceBN.toString(10).length < 78 ? liquidationPrice : "inf",
    } as ReturnType;
};
