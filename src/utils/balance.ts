import BigNumber from "bignumber.js";
import { BN_1E18 } from "./bigNumber";

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY;

export const getNewBalance = (oldBalance: BigNumber, APR: BigNumber) => {
    const addedPerSecond = oldBalance.multipliedBy(APR).dividedBy(YEAR).dividedBy(BN_1E18);
    // we need per 200ms
    return oldBalance.plus(addedPerSecond.div(5));
};
