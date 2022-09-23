import BigNumber from "bignumber.js";
import { BN_1E18 } from "./bigNumber";

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY;

export const getNewBalance = (oldBalance: BigNumber, APR: BigNumber) => {
    const added = oldBalance.multipliedBy(APR).dividedBy(YEAR).dividedBy(BN_1E18);
    // newBalance = oldBalance * (1 + ARP / YEAR) = oldBalance + oldBalance * ARP / YEAR
    return oldBalance.plus(added);
};
