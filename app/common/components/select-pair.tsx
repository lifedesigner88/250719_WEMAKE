import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import type { Tables } from "@/database.types";


export default function SelectPair({
                                       label,
                                       description,
                                       name,
                                       required,
                                       placeholder,
                                       options,
                                       defaultValue,
                                   }: {
    label: string,
    description: string,
    name: string,
    required?: boolean,
    placeholder: string,
    options: { label: string, value: string, } []
    defaultValue?: Tables<"profiles">["role"],
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className={"flex flex-col gap-1 w-full"} onClick={() => setOpen(true)}>
            <Label className={"items-start flex flex-col gap-1"}>
                {label}
                <small className={"text-muted-foreground"}>{description}</small>
            </Label>
            <Select
                open={open}
                onOpenChange={setOpen}
                name={name}
                required={required}
                defaultValue={defaultValue}
            >
                <SelectTrigger className="w-full">
                    <SelectValue
                        placeholder={placeholder}
                    />
                </SelectTrigger>
                <SelectContent>
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}> {option.label} </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}