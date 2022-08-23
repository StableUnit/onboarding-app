import React from "react";
import { getNetworkNameById, NetworkType } from "utils/network";
import DefaultImage from "../../images/default.png";
import EthImage from "../../images/network/Eth.svg";
import RinkebyImage from "../../images/network/Rinkeby.svg";
import PolygonImage from "../../images/network/Polygon.svg";
import FantomImage from "../../images/network/Fantom.svg";
import BscImage from "../../images/network/BSC.svg";
import AvalancheImage from "../../images/network/Avalanche.svg";
import AuroraImage from "../../images/network/Aurora.png";
import HarmonyImage from "../../images/network/Harmony.svg";

interface NetworkImageProps {
    chainId?: number;
    width?: number;
    height?: number;
}

const getNetworkImage = (network?: NetworkType) => {
    switch (network?.toLowerCase()) {
        case "eth":
            return EthImage;
        case "goerli":
            return RinkebyImage;
        case "polygon":
            return PolygonImage;
        case "fantom":
            return FantomImage;
        case "bsc":
            return BscImage;
        case "avalanche":
            return AvalancheImage;
        case "aurora":
            return AuroraImage;
        case "harmony":
            return HarmonyImage;
        default:
            return DefaultImage;
    }
};

export const NetworkImage = ({ chainId, width = 32, height = 32 }: NetworkImageProps) =>
    chainId ? (
        <img
            src={getNetworkImage(getNetworkNameById(chainId))}
            width={width}
            height={height}
            alt={getNetworkNameById(chainId)}
        />
    ) : null;
