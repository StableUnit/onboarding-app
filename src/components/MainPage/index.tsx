import React, { useContext } from "react";
import { StateContext } from "reducer/constants";
import ButtonGradient from "ui-kit/components/ButtonGradient/ButtonGradient";
import { getNetworkNameById, NetworkType, supportedNetworks } from "utils/network";

import "./styles.scss";

export const MainPage = () => {
    const { chainId } = useContext(StateContext);
    const isNotSupportedChain = !!chainId && !supportedNetworks.includes(getNetworkNameById(chainId) as NetworkType);

    return (
        <div className="main-page">
            <ButtonGradient>Get Rinkeby ETH</ButtonGradient>
            <div className="main-page__tokens-title">Get custom tokens:</div>
            <div className="main-page__tokens">
                <ButtonGradient disabled={isNotSupportedChain}>Get 1 WETH</ButtonGradient>
                <ButtonGradient disabled={isNotSupportedChain}>Get 1 WBTC</ButtonGradient>
                <ButtonGradient disabled={isNotSupportedChain}>Get 1000 USDT</ButtonGradient>
                <ButtonGradient disabled={isNotSupportedChain}>Get 1000 1INCH</ButtonGradient>
            </div>
        </div>
    );
};
