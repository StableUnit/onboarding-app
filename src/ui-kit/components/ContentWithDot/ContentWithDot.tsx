import React from "react";
import cn from "classnames";

import "./ContentWithDot.scss";

interface ContentWithDotProps {
    color: string;
    className?: string;
    children?: React.ReactNode;
}

const ContentWithDot = ({ color, children, className }: ContentWithDotProps) => {
    return (
        <div className={cn("content-with-dot", className)}>
            <div className="content-with-dot__dot" style={{ backgroundColor: color }} />
            <div className="content-with-dot__content">{children}</div>
        </div>
    );
};

export default ContentWithDot;
