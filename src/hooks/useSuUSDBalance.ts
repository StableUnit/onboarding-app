import { useContext, useEffect, useState } from "react";
import { Actions } from "reducer";
import { DispatchContext, StateContext } from "reducer/constants";
import { getNewBalance } from "utils/balance";
import { BORROW_CURRENCY } from "utils/currency";
import { useBalance } from "./parameters/useBalance";
import { useSuAPR } from "./parameters/useSuAPR";

const UPDATE_BALANCE_INTERVAL = 1000;

export const useSuUSDBalance = () => {
    const { isMounted, suUSDBalance } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const { suAPRBN } = useSuAPR();
    const { balanceBN } = useBalance(BORROW_CURRENCY);
    // eslint-disable-next-line no-undef
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (balanceBN) {
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
            dispatch({ type: Actions.SetSuUSDBalance, payload: balanceBN });
        }
    }, [balanceBN, dispatch]);

    useEffect(() => {
        if (isMounted) {
            setTimeoutId(
                setTimeout(() => {
                    dispatch({ type: Actions.SetSuUSDBalance, payload: getNewBalance(suUSDBalance, suAPRBN) });
                }, UPDATE_BALANCE_INTERVAL)
            );
        }

        return () => {
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
        };
    }, [dispatch, isMounted, suUSDBalance, suAPRBN]);
};
