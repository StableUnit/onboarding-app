import React from "react";

import { ReactComponent as SuusdIcon } from "icons/currency/suUSD.svg";
import { ReactComponent as EthIcon } from "icons/currency/ETH.svg";
import { ReactComponent as SHIBIcon } from "icons/currency/SHIB.svg";
import { ReactComponent as OneInchIcon } from "icons/currency/1inch.svg";
import { ReactComponent as UsdtIcon } from "icons/currency/USDT.svg";
import { ReactComponent as WBTCIcon } from "icons/currency/WBTC.svg";
import tokenList from "submodule-contract-artifacts/stableunit.tokenlist.json";

export type SupportedTokensType = "WETH" | "WBTC" | "USDT" | "1INCH" | "SHIB" | "SuUSD";

export const BORROW_CURRENCY = "SuUSD" as SupportedTokensType;

export const getSupportedTokens = (chainId: number) => tokenList.tokens.filter((v) => v.chainId === chainId);
export const getSupportedTokensAddresses = (chainId: number) => getSupportedTokens(chainId).map((v) => v.address);
export const getSupportedTokensAddressesNoSU = (chainId: number) =>
    getSupportedTokens(chainId)
        .filter((v) => v.symbol !== BORROW_CURRENCY)
        .map((v) => v.address);

export const getTokenByName = (name: SupportedTokensType, chainId: number | undefined) =>
    tokenList.tokens.find((v) => v.symbol === name && v.chainId === chainId);

export const getAddress = (name: SupportedTokensType, chainId: number | undefined) =>
    getTokenByName(name, chainId)?.address;

export const getName = (address: string, chainId: number | undefined) =>
    tokenList.tokens.find((v) => v.address === address && v.chainId === chainId)?.symbol as
        | SupportedTokensType
        | undefined;

export const getDecimals = (name: SupportedTokensType, chainId: number | undefined) =>
    getTokenByName(name, chainId)?.decimals;

export const getTokenIcon = (tokenName: SupportedTokensType) => {
    switch (tokenName) {
        case "WETH":
            return <EthIcon />;
        case "WBTC":
            return <WBTCIcon />;
        case "USDT":
            return <UsdtIcon />;
        case "1INCH":
            return <OneInchIcon />;
        case "SHIB":
            return <SHIBIcon />;
        case "SuUSD":
            return <SuusdIcon />;
        default:
            return null;
    }
};
