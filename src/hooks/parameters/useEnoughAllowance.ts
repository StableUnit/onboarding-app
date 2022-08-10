import { useContext, useEffect, useState } from "react";
import { StateContext } from "reducer/constants";
import { CommonFactory } from "utils/api";
import { SupportedTokensType } from "utils/currency";

export const useEnoughAllowance = (tokenName: SupportedTokensType, address?: string) => {
    const { currentAddress, chainId } = useContext(StateContext);
    const [isEnoughAllowance, setIsEnoughAllowance] = useState(false);

    const updateAllowance = async () => {
        if (currentAddress && tokenName && chainId) {
            const allowance = await CommonFactory.allowance(tokenName, address, chainId);
            setIsEnoughAllowance(!allowance.isZero());
        }
    };

    useEffect(() => {
        updateAllowance();
    }, [tokenName, currentAddress, address, chainId]);

    return {
        isEnoughAllowance,
        setIsEnoughAllowance: (value: boolean) => setIsEnoughAllowance(value),
    };
};
