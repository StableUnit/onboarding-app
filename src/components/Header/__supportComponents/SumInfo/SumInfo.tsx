import React, { useContext } from "react";

import { useSuAPR } from "hooks/parameters/useSuAPR";
import tokenLogo from "icons/currency/suUSD.svg";
import { StateContext } from "reducer/constants";
import { BORROW_CURRENCY } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import "./SumInfo.scss";

const SumInfo = () => {
    const { currentAddress, suUSDBalance } = useContext(StateContext);
    const { suAPR } = useSuAPR();

    return (
        <div className="sum-info">
            <img src={tokenLogo} width={48} height={48} />
            <div className="sum-info__info">
                {currentAddress ? (
                    <>
                        <div className="sum-info__info__title">{BORROW_CURRENCY}</div>
                        <div className="sum-info__info__description">
                            {toHRNumber(suUSDBalance, 18, 8).toLocaleString("en-us", {
                                maximumFractionDigits: 6,
                                minimumFractionDigits: 6,
                            })}
                        </div>
                    </>
                ) : (
                    <div className="sum-info__info__description">{suAPR.toFixed(2)}% APY</div>
                )}
            </div>
        </div>
    );
};

export default SumInfo;
