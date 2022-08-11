import React, { useContext } from "react";
import { StateContext } from "reducer/constants";
import Button from "ui-kit/components/Button/Button";
import GradientHref from "ui-kit/components/GradientHref/GradientHref";
import { getNetworkNameById, NetworkType, supportedNetworks } from "utils/network";
import { TokenData } from "utils/types";
import { CommonFactory } from "utils/api";
import { addToMetamask, getTokenByName } from "utils/currency";
import { addErrorNotification, addSuccessNotification } from "utils/notification";

import "./styles.scss";

const TOKENS = [
    {
        name: "WETH",
        amount: 1,
    },
    {
        name: "WBTC",
        amount: 1,
    },
    {
        name: "USDT",
        amount: 1000,
    },
    {
        name: "1INCH",
        amount: 1000,
    },
] as TokenData[];

export const MainPage = () => {
    const { chainId } = useContext(StateContext);
    const isNotSupportedChain = !!chainId && !supportedNetworks.includes(getNetworkNameById(chainId) as NetworkType);

    const handleOpenFaucet = () => {
        window.open("https://rinkebyfaucet.com/", "_blank");
    };

    const handleTokenMint = (data: TokenData) => async () => {
        try {
            await CommonFactory.mint(data.name, data.amount, chainId);
            addSuccessNotification("Mint process", "Success");
        } catch (e) {
            console.error(e);
            addErrorNotification("Mint process", "Error");
        }
    };

    const handleAdd = (data: TokenData) => async () => {
        const tokenMetadata = getTokenByName(data.name, chainId);
        if (tokenMetadata) {
            await addToMetamask(tokenMetadata);
        }
    };

    return (
        <div className="main-page">
            <Button className="main-page__token__text" onClick={handleOpenFaucet}>
                Get &nbsp;<GradientHref>RinkebyETH</GradientHref>
            </Button>
            <div className="main-page__tokens-title">Get custom tokens:</div>
            <div className="main-page__tokens">
                {TOKENS.map((tokenData) => (
                    <div className="main-page__token" key={tokenData.name}>
                        <Button
                            width={160}
                            disabled={isNotSupportedChain}
                            className="main-page__token__text"
                            onClick={handleTokenMint(tokenData)}
                        >
                            Get {tokenData.amount}&nbsp;<GradientHref>{tokenData.name}</GradientHref>
                        </Button>
                        <GradientHref className="main-page__token__add" onClick={handleAdd(tokenData)}>
                            Add to metamask
                        </GradientHref>
                    </div>
                ))}
            </div>
        </div>
    );
};
