import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import cn from "classnames";

import { Actions } from "reducer";
import { useSuUSDBalance, useUpdateListener } from "hooks";
import { DispatchContext, StateContext } from "reducer/constants";
import { BugIcon } from "ui-kit/images/icons";
import { setUtilsCurrentAddress, setUtilsWeb3 } from "utils/api";
import {
    DEFAULT_NETWORK,
    getIdByNetworkName,
    getNetworkNameById,
    NETWORK,
    networkInfo,
    NetworkType,
    supportedNetworks,
} from "utils/network";

import Header from "../Header/Header";
import NetworkModal from "../NetworkModal/NetworkModal";
import { MainPage } from "../MainPage";

import "./App.scss";

const getRPC = () => {
    const res = {} as Record<number, string>;

    Object.keys(NETWORK).forEach((key) => {
        if (key !== NETWORK.unsupported) {
            const networkName = NETWORK[key as NetworkType];
            res[getIdByNetworkName(networkName)] = networkInfo[networkName].rpcUrls[0];
        }
    });

    return res;
};

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: getRPC(),
            chainId: [getIdByNetworkName(DEFAULT_NETWORK)],
            network: DEFAULT_NETWORK,
            qrcode: true,
            qrcodeModalOptions: {
                mobileLinks: ["metamask", "trust"],
            },
        },
    },
    binancechainwallet: {
        package: true,
    },
    coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
            appName: "StableUnit App",
            infuraId: "20518e992a3143bd86f2367198e7856a",
            rpc: getRPC(),
            chainId: [getIdByNetworkName(DEFAULT_NETWORK)],
            darkMode: true,
        },
    },
};
const web3Modal = new Web3Modal({
    network: DEFAULT_NETWORK,
    cacheProvider: true,
    providerOptions,
    theme: {
        background: "#313131",
        main: "rgb(255, 255, 255)",
        secondary: "rgb(136, 136, 136)",
        border: "none",
        hover: "rgba(32, 32, 29, 0.8)",
    },
});

const App = React.memo(() => {
    const [web3, setWeb3] = useState(new Web3(Web3.givenProvider));
    const { chainId } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    useSuUSDBalance();
    useUpdateListener();

    const onDisconnect = async () => {
        // @ts-ignore
        if (web3 && web3.currentProvider && web3.currentProvider.close) {
            // @ts-ignore
            await web3.currentProvider.close();
        }
        dispatch({ type: Actions.SetCurrentAddress, payload: undefined });
        dispatch({ type: Actions.SetChainId, payload: undefined });
        await web3Modal.clearCachedProvider();
    };
    const subscribeProvider = async (newProvider: any) => {
        if (!newProvider.on) {
            return;
        }
        newProvider.on("close", () => {
            onDisconnect();
        });
        newProvider.on("accountsChanged", async (accounts: string[]) => {
            dispatch({ type: Actions.SetCurrentAddress, payload: accounts[0] });
            setUtilsCurrentAddress(accounts[0]);
        });
        newProvider.on("chainChanged", async (hexChainId: string) => {
            const newChainId = Web3.utils.hexToNumber(hexChainId);
            dispatch({ type: Actions.SetChainId, payload: newChainId });
        });
    };
    const onConnect = async () => {
        const provider = await web3Modal.connect();
        await subscribeProvider(provider);

        const newWeb3: Web3 = new Web3(provider);
        setUtilsWeb3(newWeb3);
        setWeb3(newWeb3);

        const accounts = await web3.eth.getAccounts();
        dispatch({ type: Actions.SetCurrentAddress, payload: accounts[0] });
        setUtilsCurrentAddress(accounts[0]);

        const newChainId = await web3.eth.getChainId();
        dispatch({ type: Actions.SetChainId, payload: newChainId });
        dispatch({ type: Actions.SetIsMounted, payload: true });
    };

    const onBugClick = () => {
        window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSf1Tqq8TwjOtgK8_tFndM3QDJW2XTy8oCs6zoPLUWey1nBvwA/viewform",
            "_blank"
        );
    };

    useEffect(() => {
        onConnect();
    }, []);

    const isNotSupportedChain = chainId && !supportedNetworks.includes(getNetworkNameById(chainId) as NetworkType);

    return (
        <div className="App">
            <Header onConnect={onConnect} onDisconnect={onDisconnect} />
            <div className="App__content">
                <div className={cn("App__scroller", { "App__scroller--disabled": isNotSupportedChain })}>
                    <MainPage web3={web3} />
                </div>
                <BugIcon className="bug-icon" onClick={onBugClick} />
            </div>
            <NetworkModal />
        </div>
    );
});

export default App;
