import React from "react";
import cn from "classnames";

import "./GradientHref.scss";

interface GradientBorderProps {
    id?: string;
    className?: string;
    target?: string;
    disabled?: boolean;
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const GradientHref = ({ id, children, className, target, disabled, href, onClick }: GradientBorderProps) => {
    const handleClick = () => {
        console.log(href)
    }

    return (
        <div
            onClick={handleClick}
            id={id}
            className={cn("gradient-href gradient-href-text", className, { "gradient-href--disabled": disabled })}
        >
            {children}
        </div>
    );
};

export default GradientHref;
