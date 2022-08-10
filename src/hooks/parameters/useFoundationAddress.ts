import { useContext, useEffect, useState } from "react";
import { SuVaultFactory } from "../../utils/api";
import { StateContext } from "../../reducer/constants";

export const useFoundationAddress = () => {
    const { isMounted } = useContext(StateContext);
    const [foundationAddress, setFoundationAddress] = useState("");

    useEffect(() => {
        if (isMounted) {
            SuVaultFactory.getFoundation().then((newFoundationAddress) => setFoundationAddress(newFoundationAddress));
        }
    }, [isMounted]);

    return foundationAddress;
};
