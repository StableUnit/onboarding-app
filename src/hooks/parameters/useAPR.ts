import { useContext } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { RewardContractFactory } from "utils/api";
import { getAddress, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useAPR = (currency: SupportedTokensType) => {
    const { chainId } = useContext(StateContext);
    const tokenAddress = getAddress(currency, chainId);
    const rewardBN = useParameter(
        `apr ${currency}`,
        () => RewardContractFactory.getPoolApr(tokenAddress),
        tokenAddress
    );

    return {
        rewardBN: rewardBN ?? new BigNumber(0),
        reward: rewardBN ? toHRNumber(rewardBN, 18) : 0,
    };
};
