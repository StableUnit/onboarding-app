import BigNumber from "bignumber.js";
import { PossibleLockupPeriodsType, TabType } from "utils/types";

// eslint-disable-next-line no-shadow
export enum Actions {
    SetCurrentAddress = "SET_CURRENT_ADDRESS",
    SetChainId = "SET_CHAIN",
    SetIsActionModalOpened = "SET_IS_ACTION_MODAL_OPENED",
    SetActionModalTab = "SET_ACTION_MODAL_TAB",
    SetUpdateFlag = "SET_UPDATE_FLAG",
    AddToUpdatePool = "ADD_TO_UPDATE_POOL",
    RemoveFromUpdatePool = "REMOVE_FROM_UPDATE_POOL",
    SetIsMounted = "SET_IS_MOUNTED",
    SetIsNetworkModalVisible = "SET_IS_NETWORK_MODAL_VISIBLE",
    SetPossibleLockupPeriods = "SET_POSSIBLE_LOCKUP_PERIODS",
    SetSuUSDBalance = "SET_SUUSD_BALANCE",
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
          type: Actions.SetIsActionModalOpened;
          payload: boolean;
      }
    | {
          type: Actions.SetActionModalTab;
          payload: TabType;
      }
    | {
          type: Actions.SetUpdateFlag;
          payload: boolean | undefined;
      }
    | {
          type: Actions.AddToUpdatePool;
          payload: string;
      }
    | {
          type: Actions.RemoveFromUpdatePool;
          payload: string;
      }
    | {
          type: Actions.SetIsNetworkModalVisible;
          payload: boolean;
      }
    | {
          type: Actions.SetSuUSDBalance;
          payload: BigNumber;
      }
    | {
          type: Actions.SetPossibleLockupPeriods;
          payload: PossibleLockupPeriodsType;
      }
    | {
          type: Actions.SetIsMounted;
          payload: boolean;
      };

export interface ReducerState {
    currentAddress?: string;
    chainId?: number;
    isActionModalOpened: boolean;
    actionModalTab: TabType;
    updateFlag?: boolean;
    isMounted: boolean;
    suUSDBalance: BigNumber;
    updatePool?: string[];
    possibleLockupPeriods: PossibleLockupPeriodsType;
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
        case Actions.SetIsActionModalOpened:
            return {
                ...state,
                isActionModalOpened: action.payload,
            };
        case Actions.SetActionModalTab:
            return {
                ...state,
                actionModalTab: action.payload,
            };
        case Actions.SetUpdateFlag: {
            return {
                ...state,
                updateFlag: action.payload,
            };
        }
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
        case Actions.SetPossibleLockupPeriods: {
            return {
                ...state,
                possibleLockupPeriods: action.payload,
            };
        }
        case Actions.SetSuUSDBalance: {
            return {
                ...state,
                suUSDBalance: action.payload,
            };
        }
        case Actions.AddToUpdatePool: {
            const haveKey = state.updatePool?.find((v) => v === action.payload);
            return {
                ...state,
                updatePool: haveKey ? state.updatePool : [...(state.updatePool ?? []), action.payload],
            };
        }
        case Actions.RemoveFromUpdatePool: {
            return {
                ...state,
                updatePool: state.updatePool?.filter((v) => v !== action.payload),
            };
        }
        default:
            return state;
    }
};

export default reducer;
