import React from "react";
import cn from "classnames";
import "./Button.scss";
import GradientBorder from "../GradientBorder/GradientBorder";

interface ButtonProps {
    className?: string;
    padding?: string;
    text?: string;
    disabled?: boolean;
    onClick?: () => void;
    width?: number;
    id?: string;
    children?: React.ReactNode;
}

const Button = ({ onClick, padding, text, className, disabled, id, children, width, ...props }: ButtonProps) => {
    return (
        <GradientBorder borderRadius={40}>
            <div
                id={id}
                className={cn("button", className, { "button--disabled": disabled })}
                onClick={disabled ? undefined : onClick}
                style={{ padding, width }}
                {...props}
            >
                {children ?? text}
            </div>
        </GradientBorder>
    );
};

export default Button;
