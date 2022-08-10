import React from "react";
import cn from "classnames";

import "./GradientHref.scss";

interface GradientBorderProps {
    id?: string;
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

const GradientHref = ({ id, children, className, disabled, onClick }: GradientBorderProps) => {
    return (
        <div
            onClick={onClick}
            id={id}
            className={cn("gradient-href gradient-href-text", className, { "gradient-href--disabled": disabled })}
        >
            {children}
        </div>
    );
};

export default GradientHref;
