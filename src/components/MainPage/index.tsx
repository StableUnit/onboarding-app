import React, { useContext } from "react";
import { StateContext } from "reducer/constants";
import Button from "ui-kit/components/Button/Button";
import GradientHref from "ui-kit/components/GradientHref/GradientHref";
import { getNetworkNameById, NetworkType, supportedNetworks } from "utils/network";
import { TokenData } from "utils/types";
import { CommonFactory } from "utils/api";

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
        await CommonFactory.mint(data.name, 0, chainId);
    };

    return (
        <div className="main-page">
            <Button onClick={handleOpenFaucet}>Get Rinkeby ETH</Button>
            <div className="main-page__tokens-title">Get custom tokens:</div>
            <div className="main-page__tokens">
                {TOKENS.map((tokenData) => (
                    <Button
                        disabled={isNotSupportedChain}
                        className="main-page__tokens__text"
                        onClick={handleTokenMint(tokenData)}
                    >
                        Get {tokenData.amount}&nbsp;<GradientHref>{tokenData.name}</GradientHref>
                    </Button>
                ))}
            </div>
        </div>
    );
};
