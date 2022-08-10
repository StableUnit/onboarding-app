import React, { useContext } from 'react';
import ButtonGradient from "ui-kit/components/ButtonGradient/ButtonGradient";
import {getNetworkNameById, NetworkType, supportedNetworks} from "../../utils/network";
import {StateContext} from "../../reducer/constants";

import './styles.scss';

export const MainPage = () => {
    const { chainId } = useContext(StateContext);
    const isNotSupportedChain = !!chainId && !supportedNetworks.includes(getNetworkNameById(chainId) as NetworkType);

    return (
        <div className='main-page'>
            <ButtonGradient>Get Rinkeby ETH</ButtonGradient>
            <div>Get custom tokens:</div>
            <ButtonGradient disabled={isNotSupportedChain}>Get 1 WETH</ButtonGradient>
            <ButtonGradient disabled={isNotSupportedChain}>Get 1 WBTC</ButtonGradient>
            <ButtonGradient disabled={isNotSupportedChain}>Get 1000 USDT</ButtonGradient>
            <ButtonGradient disabled={isNotSupportedChain}>Get 1000 1INCH</ButtonGradient>
        </div>
    )
}