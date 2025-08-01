import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";


export default function SelectPair({
                                       label,
                                       description,
                                       name,
                                       required,
                                       placeholder,
                                       options,
                                   }: {
    label: string,
    description: string,
    name: string,
    required?: boolean,
    placeholder: string,
    options: { label: string, value: string, } []
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className={"flex flex-col gap-1"} onClick={() => setOpen(true)}>
            <Label className={"items-start flex flex-col gap-1"}>
                {label}
                <small className={"text-muted-foreground"}>{description}</small>
            </Label>
            <Select
                open={open}
                onOpenChange={setOpen}
                name={name}
                required={required}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder}/>
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