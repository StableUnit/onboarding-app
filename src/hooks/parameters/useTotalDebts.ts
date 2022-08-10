import { useContext } from "react";

import { StateContext } from "reducer/constants";
import { SuVaultFactory } from "utils/api";
import { getAddress, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";
import { useParameter } from "./useParameter";

export const useTotalDebts = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const tokenAddress = getAddress(currency, chainId);
    const totalDebtsBN = useParameter(
        `totalDebts ${currency}`,
        () => SuVaultFactory.getTotalDebtE18(tokenAddress),
        tokenAddress
    );

    return {
        totalDebtsBN,
        totalDebts: totalDebtsBN ? toHRNumber(totalDebtsBN, 18) : 0,
    };
};
