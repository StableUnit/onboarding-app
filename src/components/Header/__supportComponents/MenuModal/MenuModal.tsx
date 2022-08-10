import React, { useContext, useState } from "react";
import Modal from "react-modal";

import cn from "classnames";
import { ReactComponent as CloseIcon } from "icons/close.svg";
import { ReactComponent as ArrowRightIcon } from "icons/arrow-right.svg";
import tokenLogo from "icons/currency/suUSD.svg";
import { StateContext } from "reducer/constants";
import { NetworkImage } from "ui-kit/components/NetworkImage/NetworkImage";
import ButtonGradient from "ui-kit/components/ButtonGradient/ButtonGradient";
import { getShortAddress } from "utils/network";

import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";

import "./MenuModal.scss";

interface NetworkModalProps {
    onClose: () => void;
    onConnect: () => void;
    onDisconnect: () => void;
    openNetworkModal: () => void;
    visible: boolean;
}

const MenuModal = ({ onClose, visible, onDisconnect, onConnect, openNetworkModal }: NetworkModalProps) => {
    const { currentAddress, chainId } = useContext(StateContext);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible((v) => !v);
    };
    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };

    return (
        <Modal isOpen={visible} onRequestClose={onClose} className="menu-modal" overlayClassName="menu-modal-overlay">
            <div className="menu-modal__header">
                <img src={tokenLogo} width={36} height={36} />
                <CloseIcon className="menu-modal__close" onClick={onClose} />
            </div>
            <div className="menu-modal__content">
                {currentAddress ? (
                    <div className="menu-modal__address">
                        <div
                            onClick={toggleDropdown}
                            className={cn("menu-modal__address__button", {
                                "menu-modal__address__button--opened": isDropdownVisible,
                            })}
                        >
                            <div className="menu-modal__address__button__info">
                                <NetworkImage chainId={chainId} width={28} height={28} />
                                <div className="menu-modal__address__button__info__title">
                                    {getShortAddress(currentAddress)}
                                </div>
                            </div>
                            <ArrowRightIcon />
                        </div>
                        <HeaderDropdown
                            className="menu-modal__address__dropdown"
                            isInline
                            onDisconnect={onDisconnect}
                            onClose={closeDropdown}
                            visible={isDropdownVisible}
                            onOpenNetworkModal={openNetworkModal}
                        />
                    </div>
                ) : (
                    <ButtonGradient className="menu-modal__connect" onClick={onConnect}>
                        CONNECT WALLET
                    </ButtonGradient>
                )}
            </div>
        </Modal>
    );
};

export default MenuModal;
