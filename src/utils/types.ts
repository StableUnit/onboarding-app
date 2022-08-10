import { SupportedTokensType } from "./currency";

export type TokenData = {
    name: SupportedTokensType;
    amount: number;
};

export type TokenMetadata = {
    address: string;
    symbol: string;
    decimals: number;
    image?: string;
};
