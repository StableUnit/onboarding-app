import React, { useContext } from "react";
import Web3 from "web3";

import CONTRACT_BOX from "contracts/box.json";
import { StateContext } from "reducer/constants";
import Button from "ui-kit/components/Button/Button";
import GradientHref from "ui-kit/components/GradientHref/GradientHref";
import { getIdByNetworkName, getNetworkNameById, NETWORK, NetworkType, supportedNetworks } from "utils/network";
import { TokenData } from "utils/types";
import { CommonFactory } from "utils/api";
import { addToMetamask, getTokenByName } from "utils/currency";
import { addErrorNotification, addSuccessNotification } from "utils/notification";
import { BN_1E18 } from "utils/bigNumber";

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
] as TokenData[];

type Props = {
    web3: Web3;
};

const CHAIN_ID = getIdByNetworkName(NETWORK.goerli);

export const MainPage = ({ web3 }: Props) => {
    const { chainId, currentAddress } = useContext(StateContext);
    const isNotSupportedChain = !!chainId && !supportedNetworks.includes(getNetworkNameById(chainId) as NetworkType);

    const handleOpenFaucet = () => {
        window.open("https://goerli-faucet.mudit.blog/", "_blank");
    };

    const handleOpenMainDApp = () => {
        window.open("https://testnet.stableunit.org/", "_blank");
    };

    const handleTokenMint = (data: TokenData) => async () => {
        try {
            const res = await CommonFactory.mint(data.name, data.amount, chainId);
            if (res) {
                addSuccessNotification("Mint process", "Success");
            }
        } catch (e) {
            console.error(e);
            addErrorNotification("Mint process", "Error");
        }
    };

    const handleAdd = (data: TokenData) => async () => {
        const tokenMetadata = getTokenByName(data.name, chainId);
        if (tokenMetadata) {
            await addToMetamask({
                ...tokenMetadata,
                image: data.name === "SuUSD" ? "https://stableunit.org/assets/img/logo.svg" : undefined,
            });
        }
    };

    const getSuUSD = () => {
        const boxContract = new web3.eth.Contract(CONTRACT_BOX as any, "0xeF77E0394D2b6229a760033B79F9c109F6602fb2");
        const suUSDToken = getTokenByName("SuUSD", CHAIN_ID);
        if (suUSDToken) {
            return boxContract.methods
                .retrieve(suUSDToken.address, BN_1E18.multipliedBy(1000).toString(10))
                .send({ from: currentAddress });
        }
    };

    return (
        <div className="main-page">
            <div className="main-page__tokens-title">Testnet onboarding</div>
            <ol>
                <li>
                    <div className="main-page__token">
                        To get GoerliETH visit
                        <GradientHref href="https://goerli-faucet.pk910.de/">goerli-faucet.pk910.de</GradientHref>
                        or
                        <GradientHref href="https://discord.gg/puMeUhUpJf">ask in discord</GradientHref>
                    </div>
                </li>
                <li>
                    <div className="main-page__token">
                        <Button
                            width={160}
                            disabled={isNotSupportedChain}
                            className="main-page__token__text"
                            onClick={getSuUSD}
                        >
                            Get&nbsp;1000&nbsp;<GradientHref>SuUSD</GradientHref>
                        </Button>
                        <GradientHref
                            className="main-page__token__add"
                            onClick={handleAdd({ name: "SuUSD", amount: 0 })}
                        >
                            Add to metamask
                        </GradientHref>
                    </div>
                </li>
                <li>Open your wallet and enjoy</li>
            </ol>

            <div className="main-page__tokens-title">Alternative</div>
            <ol>
                <li>
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
                </li>
                <li>
                    <GradientHref className="link" onClick={handleOpenMainDApp}>
                        Borrow StableUnits
                    </GradientHref>
                </li>
                <li>Open your wallet and enjoy</li>
            </ol>
        </div>
    );
};
