import type { Route } from "./+types/submit-page";
import PageHeader from "~/common/components/page-header";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { Form } from "react-router";
import React, { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";

export const meta: Route.MetaFunction = () => [
    { title:"submit | wemake" },
    { name:"discription", content:"Submit your product to wemake" }
]

export default function SubmitProductPage() {
    const [icon, setIcon] = useState<string | null>(null);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setIcon(URL.createObjectURL(file));
            console.log(icon);
        }
    };

    return (
        <div>
            <PageHeader title={"Submit Product"} description={"Submit your product to wemake"}/>
            <Form className={"grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"}>

                {/*왼쪽 텍스트 공간*/}
                <div className={"space-y-5"}>
                    <InputPair
                        label="Name"
                        description="This is the name of your product"
                        placeholder="Name of your product"
                        id="name"
                        name="name"
                        type="text"
                        required
                    />
                    <InputPair
                        label="Tagline"
                        description="60 characters or less"
                        id="tagline"
                        name="tagline"
                        required
                        type="text"
                        placeholder="A concise description of your product"
                    />
                    <InputPair
                        label="URL"
                        description="The URL of your product"
                        id="url"
                        name="url"
                        required
                        type="url"
                        placeholder="https://example.com"
                    />
                    <InputPair
                        textArea
                        label="Description"
                        description="A detailed description of your product"
                        id="description"
                        name="description"
                        required
                        type="text"
                        placeholder="A detailed description of your product"
                    />

                    <SelectPair
                        label="Category"
                        description="The category of your product"
                        name="category"
                        required={true}
                        placeholder="Select a category"
                        options={[
                            { label:"Web Development", value:"web-development" },
                            { label:"Mobile Development", value:"mobile-development" },
                            { label:"Design", value:"design" },
                            { label:"Data Science", value:"data-science" },
                            { label:"Machine Learning", value:"machine-learning" },
                        ]}
                    />
                    <Button type={"submit"} className={"w-full"} size={"lg"}>Submit</Button>
                </div>

                {/*오른쪽 이미지 공간*/}
                <div className={"space-y-2"}>
                    <Label htmlFor={"icon"} className={"items-start flex flex-col gap-1"}>
                        <div className={"size-40 rounded-xl shadow-xl overflow-hidden mb-5"}>
                            {icon ? (
                                <img
                                    src={icon} className={"object-cover w-full h-full"} alt={"업로드 이미지"}/>
                            ) : null}
                        </div>
                        Icon
                        <small className={"text-muted-foreground"}>
                            This is the icon of your product.
                        </small>
                    </Label>
                    <Input
                        id={"icon"}
                        type={"file"}
                        className={"w-1/2"}
                        onChange={onChange}
                        required
                        name={"icon"}
                    />
                </div>

            </Form>
        </div>

    )
}
