import React from "react";
import { cn } from "../../lib/utils";

const MagicButton = ({
    children,
    className,
    onClick,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative inline-flex h-14 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group transform transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(255,195,0,0.4)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,195,0,0.6)]",
                className
            )}
            {...props}
        >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFC300_0%,#FFFFFF_50%,#FFC300_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-8 py-2 text-lg font-medium text-white backdrop-blur-3xl transition-colors group-hover:bg-card">
                {children}
            </span>
        </button>
    );
};

export default MagicButton;
