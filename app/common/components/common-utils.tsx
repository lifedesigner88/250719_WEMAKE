import React from "react";

export const renderStatItem = (
    Icon: React.ComponentType<{className?: string}>,
    count: string) => (

    <div className="flex items-center gap-px text-xs text-muted-foreground">
        <Icon className="size-4"/>
        <span>{count}</span>
    </div>
);