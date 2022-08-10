import BigNumber from "bignumber.js";

import { useCallback, useContext, useEffect, useState } from "react";
import { StateContext } from "reducer/constants";
import { CommonFactory } from "utils/api";
import { toHRNumber } from "utils/bigNumber";
import { DEFAULT_NETWORK_ID } from "utils/network";

export const useSuAPR = () => {
    const { chainId } = useContext(StateContext);
    const [suAPRBN, setSuAPRBN] = useState(new BigNumber(0));

    const update = useCallback(async () => {
        const newAPR = await CommonFactory.suUSDYieldAPR(chainId ?? DEFAULT_NETWORK_ID);
        if (newAPR !== undefined) {
            setSuAPRBN(newAPR);
        }
    }, [chainId]);

    useEffect(() => {
        update();
    }, [update]);

    return {
        suAPRBN: suAPRBN ?? new BigNumber(0),
        suAPR: suAPRBN ? toHRNumber(suAPRBN, 18) : 0,
    };
};
