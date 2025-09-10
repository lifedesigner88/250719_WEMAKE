import type { Route } from "./+types/submit-product-page";
import PageHeader from "~/common/components/page-header";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Form, redirect } from "react-router";
import React, { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { getCategories } from "~/features/products/queries";
import { makeSSRClient } from "~/supa-client";
import SelectPair from "~/common/components/select-pair";
import { getUserIdForSever } from "~/features/auth/querys";
import { createProduct, type CreateProductType } from "~/features/products/mutaions";

export const meta: Route.MetaFunction = () => [
    { title: "submit | wemake" },
    { name: "discription", content: "Submit your product to wemake" }
]


export const loader = async ({ request }: Route.LoaderArgs) => {

    const { client } = makeSSRClient(request)
    const categories = await getCategories(client, { page: 1, limit: 1000 })

    return {
        categories
    }

}

export default function SubmitProductPage({ loaderData }: Route.ComponentProps) {
    const { categories } = loaderData;

    const [icon, setIcon] = useState<string | null>(null);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setIcon(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <PageHeader title={"Submit Product"} description={"Submit your product to wemake"}/>
            <Form
                method={"post"}
                encType={"multipart/form-data"}
                className={"grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"}>

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
                    <InputPair
                        textArea
                        label="How it works"
                        description="Describe how it works"
                        id="how_it_works"
                        name="how_it_works"
                        required
                        type="text"
                        placeholder="Describe how it works"
                    />
                    <SelectPair
                        label="Category"
                        description="The category of your product"
                        name="category_id"
                        required={true}
                        placeholder="Select a category"
                        options={categories.map((category) => ({
                                value: `${category.category_id}`,
                                label: category.name
                            })
                        )
                        }
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


export const action = async ({ request }: Route.ActionArgs) => {

    const userId = await getUserIdForSever(request)
    const formData = await request.formData();
    const object = Object.fromEntries(formData);
    console.log(object, "object 🚀")

    const willUploadFile = object.icon as File;
    const { client } = makeSSRClient(request);
    const { data: uploadedFile, error } = await client.storage
        .from("products_icon")
        .upload(`${userId}/${Date.now()}`, willUploadFile, {
            upsert: false,
            contentType: willUploadFile.type,
        });

    if (error) return { error: "Failed to upload file" };

    const { data: image_url } = client.storage
        .from("products_icon").getPublicUrl(uploadedFile.path);

    if (!image_url) return { error: "Failed to get image url" }

    const product = await createProduct({
            ...object,
            icon: image_url.publicUrl,
            profile_id: userId,
            category_id: Number(object.category_id),
        } as CreateProductType
    )

    return redirect(`/products/${product.product_id}`)
}

























