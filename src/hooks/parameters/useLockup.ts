import { useContext } from "react";

import { StateContext } from "reducer/constants";
import { RewardContractFactory } from "utils/api";
import { getAddress, SupportedTokensType } from "utils/currency";
import { MONTH } from "utils/number";

import { useParameter } from "./useParameter";

export const useLockup = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const tokenAddress = getAddress(currency, chainId);
    const lockupData = useParameter("lockup", () => RewardContractFactory.getDepositLockup(tokenAddress), tokenAddress);

    return {
        ...lockupData,
        lockupMonths: lockupData?.lockupPeriodSeconds === 1 ? 0 : (lockupData?.lockupPeriodSeconds ?? 0) / MONTH,
    };
};
