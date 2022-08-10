import React, { useContext, useEffect, useState } from "react";
import cn from "classnames";

import { useDevice } from "hooks";
import { Actions } from "reducer";
import { ReactComponent as ArrowDownIcon } from "icons/arrow-down.svg";
import { ReactComponent as BurgerIcon } from "icons/burger.svg";
import tokenLogo from "icons/currency/suUSD.svg";
import { DispatchContext, StateContext } from "reducer/constants";
import ButtonGray from "ui-kit/components/ButtonGray/ButtonGray";
import Button from "ui-kit/components/Button/Button";

import { NetworkChanger } from "ui-kit/components/NetworkChanger";
import { getShortAddress } from "utils/network";

import MenuModal from "./__supportComponents/MenuModal/MenuModal";
import HeaderDropdown from "./__supportComponents/HeaderDropdown/HeaderDropdown";

import "./Header.scss";

interface HeaderProps {
    onConnect: () => void;
    onDisconnect: () => void;
}

const Header = ({ onConnect, onDisconnect }: HeaderProps) => {
    const { isMobile } = useDevice();
    const { currentAddress, chainId, isNetworkModalVisible } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const [oldChainId, setOldChainId] = useState<number>();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);

    const openDropdown = () => {
        setIsDropdownVisible(true);
    };
    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };

    const openNetworkModal = () => {
        setOldChainId(chainId);
        dispatch({ type: Actions.SetIsNetworkModalVisible, payload: true });
    };

    const openMenuModal = () => {
        setIsMenuModalVisible(true);
    };
    const closeMenuModal = () => {
        setIsMenuModalVisible(false);
    };

    useEffect(() => {
        if (isNetworkModalVisible && chainId !== oldChainId) {
            setOldChainId(chainId);
            dispatch({ type: Actions.SetIsNetworkModalVisible, payload: false });
        }
    }, [isNetworkModalVisible, chainId, oldChainId, dispatch]);

    return (
        <div className={cn("header", "header-mobile")}>
            <img src={tokenLogo} width={36} height={36} />

            <div className="header__section">
                {!isMobile && <NetworkChanger onClick={openNetworkModal} />}

                {currentAddress ? (
                    <div>
                        <ButtonGray onClick={openDropdown} className="header__address-button">
                            <div className="header__address-button__title">{getShortAddress(currentAddress)}</div>
                            <ArrowDownIcon />
                        </ButtonGray>
                        <HeaderDropdown
                            isInline={false}
                            onDisconnect={onDisconnect}
                            onClose={closeDropdown}
                            visible={isDropdownVisible}
                            onOpenNetworkModal={openNetworkModal}
                        />
                    </div>
                ) : (
                    <Button className="header__connect" id="connect-button" onClick={onConnect}>
                        Connect wallet
                    </Button>
                )}

                {isMobile && <BurgerIcon className="header__menu" onClick={openMenuModal} />}
            </div>

            <MenuModal
                visible={isMenuModalVisible}
                onClose={closeMenuModal}
                openNetworkModal={openNetworkModal}
                onDisconnect={onDisconnect}
                onConnect={onConnect}
            />
        </div>
    );
};

export default Header;
