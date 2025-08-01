import PageHeader from "~/common/components/page-header";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => [
    { title:"submit | wemake" },
    { name:"discription", content:"Submit your product to wemake" }
]

export default function SubmitPage() {
    return (
        <div>
            <PageHeader title={"Submit Product"} description={"Submit your product to wemake"}/>
            <Form className={"grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"}>
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
                            {label:"Web Development", value:"web-development"},
                            {label:"Mobile Development", value:"mobile-development"},
                            {label:"Design", value:"design"},
                            {label:"Data Science", value:"data-science"},
                            {label:"Machine Learning", value:"machine-learning"},
                        ]}
                    />

                </div>
            </Form>
        </div>

    )
}
