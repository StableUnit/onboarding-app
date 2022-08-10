import { useContext } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { SuVaultFactory } from "utils/api";
import { getAddress, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useDebts = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const tokenAddress = getAddress(currency, chainId);
    const debtsBN = useParameter("debts", () => SuVaultFactory.getDebt(tokenAddress), tokenAddress);

    return {
        debtsBN: debtsBN ?? new BigNumber(0),
        debts: debtsBN ? toHRNumber(debtsBN, 18) : 0,
    };
};
