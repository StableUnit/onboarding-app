import React from "react";
import cn from "classnames";

import GradientBorder from "../GradientBorder/GradientBorder";

import "./ButtonGradient.scss";

interface ButtonGradientProps {
    className?: string;
    padding?: string;
    text?: string;
    disabled?: boolean;
    onClick?: () => void;
    width?: number;
    id?: string;
    children?: React.ReactNode;
}

const ButtonGradient = ({
    onClick,
    padding,
    text,
    className,
    disabled,
    id,
    children,
    width,
    ...props
}: ButtonGradientProps) => {
    return (
        <GradientBorder className={`${className}-container`} borderRadius={80}>
            <div
                id={id}
                className={cn("button-gradient", className, { "button-gradient--disabled": disabled })}
                onClick={disabled ? undefined : onClick}
                style={{ padding, width }}
                {...props}
            >
                <div className="button-gradient__content">
                    <div className="button-gradient__text">{children ?? text}</div>
                </div>
            </div>
        </GradientBorder>
    );
};

export default ButtonGradient;
