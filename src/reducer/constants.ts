import React from "react";
import BigNumber from "bignumber.js";

import { ActionType, ReducerState } from "./index";

export const initialState: ReducerState = {
    chainId: undefined,
    currentAddress: undefined,
    isActionModalOpened: false,
    actionModalTab: "deposit",
    updateFlag: undefined,
    updatePool: undefined,
    isMounted: false,
    isNetworkModalVisible: false,
    suUSDBalance: new BigNumber(0),
    possibleLockupPeriods: [],
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<ActionType>>(() => null);
