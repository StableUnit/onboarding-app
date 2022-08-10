import React from "react";

import { ActionType, ReducerState } from "./index";

export const initialState: ReducerState = {
    chainId: undefined,
    currentAddress: undefined,
    isMounted: false,
    isNetworkModalVisible: false,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<ActionType>>(() => null);
