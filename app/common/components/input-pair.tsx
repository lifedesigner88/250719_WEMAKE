import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import type { InputHTMLAttributes } from "react";
import { Textarea } from "~/common/components/ui/textarea";

export default function InputPair({
                                      label,
                                      description,
                                      textArea = false,
                                      ...rest
                                  }: {
    label: string,
    description: string,
    textArea?: boolean,
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
    return (
        <div className={"flex flex-col space-y-2"}>
            <Label htmlFor={rest.id} className={"items-start flex flex-col gap-1"}>
                {label}
                <small className={"text-muted-foreground"}>{description}</small>
            </Label>
            {
                textArea ?
                    (<Textarea rows={5} className={"resize-none"} {...rest} />) :
                    (<Input {...rest} />)
            }
        </div>
    );
}
