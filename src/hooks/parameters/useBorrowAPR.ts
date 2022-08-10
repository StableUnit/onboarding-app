import { useContext } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { SuVaultFactory } from "utils/api";
import { getAddress, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useBorrowAPR = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const tokenAddress = getAddress(currency, chainId);
    const borrowAprBN = useParameter(
        `borrowApr ${currency}`,
        () => SuVaultFactory.getBorrowInterestApr(tokenAddress),
        tokenAddress
    );

    return {
        borrowAprBN: borrowAprBN ?? new BigNumber(0),
        borrowApr: borrowAprBN ? toHRNumber(borrowAprBN.multipliedBy(100), 18) : 0,
    };
};
