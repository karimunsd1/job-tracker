"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Select({ children, ...props }) {
    return (
        <SelectPrimitive.Root {...props}>
            <SelectPrimitive.Trigger className="flex items-center justify-between border rounded-md px-3 py-2 w-full bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectPrimitive.Value placeholder="Select..." />
                <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
                <SelectPrimitive.Content className="bg-white border rounded-md shadow-lg z-50">
                    <SelectPrimitive.Viewport className="p-1">
                        {children}
                    </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
    );
}

export function SelectItem({ children, className, ...props }) {
    return (
        <SelectPrimitive.Item
            {...props}
            className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-sm text-sm cursor-pointer hover:bg-blue-100 focus:bg-blue-100 outline-none",
                className
            )}
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4 ml-auto text-blue-500" />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
}

export const SelectTrigger = SelectPrimitive.Trigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectContent = SelectPrimitive.Content;
