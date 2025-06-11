import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700"
};

export const Badge = ({ className, variant = "default", ...props }) => {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium",
                badgeVariants[variant],
                className
            )}
            {...props}
        />
    );
};
