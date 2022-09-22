import React from "react";
import cn from "classnames";

import "./GradientHref.scss";

interface GradientBorderProps {
    id?: string;
    className?: string;
    disabled?: boolean;
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const GradientHref = ({ id, children, className, disabled, onClick, href }: GradientBorderProps) => {
    const hrefClick = () => {
        window.open(href, "_blank");
    };

    return (
        <div
            onClick={href ? hrefClick : onClick}
            id={id}
            className={cn("gradient-href gradient-href-text", className, {
                "gradient-href--disabled": disabled,
                "gradient-href--pointer": href,
            })}
        >
            {children}
        </div>
    );
};

export default GradientHref;
