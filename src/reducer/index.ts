// eslint-disable-next-line no-shadow
export enum Actions {
    SetCurrentAddress = "SET_CURRENT_ADDRESS",
    SetChainId = "SET_CHAIN",
    SetIsMounted = "SET_IS_MOUNTED",
    SetIsNetworkModalVisible = "SET_IS_NETWORK_MODAL_VISIBLE",
}

export type ActionType =
    | {
          type: Actions.SetCurrentAddress;
          payload: string | undefined;
      }
    | {
          type: Actions.SetChainId;
          payload: number | undefined;
      }
    | {
          type: Actions.SetIsNetworkModalVisible;
          payload: boolean;
      }
    | {
          type: Actions.SetIsMounted;
          payload: boolean;
      };

export interface ReducerState {
    currentAddress?: string;
    chainId?: number;
    isMounted: boolean;
    isNetworkModalVisible: boolean;
}

const reducer: (state: ReducerState, action: ActionType) => ReducerState = (state, action) => {
    switch (action.type) {
        case Actions.SetCurrentAddress:
            return {
                ...state,
                currentAddress: action.payload,
            };
        case Actions.SetChainId:
            return {
                ...state,
                chainId: action.payload,
            };
        case Actions.SetIsMounted: {
            return {
                ...state,
                isMounted: action.payload,
            };
        }
        case Actions.SetIsNetworkModalVisible: {
            return {
                ...state,
                isNetworkModalVisible: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
