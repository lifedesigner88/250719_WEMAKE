import PageHeader from "~/common/components/page-header";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { Form } from "react-router";
import React, { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";

export default function SubmitJobPage() {
    const [companyLogo, setCompanyLogo] = useState<string | null>(null);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setCompanyLogo(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <PageHeader title={"Post a Job"} description={"Submit a job opportunity to our platform"}/>
            <Form className={"grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"}>

                {/* Left side - form fields */}
                <div className={"space-y-5"}>
                    <InputPair
                        label="Job Title"
                        description="The title of the position"
                        placeholder="e.g. Senior Software Engineer"
                        id="title"
                        name="title"
                        type="text"
                        required
                    />
                    <InputPair
                        label="Company Name"
                        description="The name of your company"
                        id="company"
                        name="company"
                        required
                        type="text"
                        placeholder="e.g. Acme Corporation"
                    />
                    <InputPair
                        label="Location"
                        description="Job location (can be 'Remote')"
                        id="location"
                        name="location"
                        required
                        type="text"
                        placeholder="e.g. Seoul, Korea or Remote"
                    />
                    <SelectPair
                        label="Job Type"
                        description="The type of employment"
                        name="jobType"
                        required={true}
                        placeholder="Select job type"
                        options={[
                            { label: "Full-time", value: "full-time" },
                            { label: "Part-time", value: "part-time" },
                            { label: "Contract", value: "contract" },
                            { label: "Internship", value: "internship" },
                            { label: "Freelance", value: "freelance" },
                        ]}
                    />
                    <InputPair
                        label="Salary Range"
                        description="Optional salary information"
                        id="salary"
                        name="salary"
                        type="text"
                        placeholder="e.g. $80,000 - $100,000"
                    />
                    <InputPair
                        textArea
                        label="Job Description"
                        description="Detailed description of the role"
                        id="description"
                        name="description"
                        required
                        type="text"
                        placeholder="Describe the responsibilities, qualifications, and other details"
                    />
                    <InputPair
                        textArea
                        label="Requirements"
                        description="Skills and experience required"
                        id="requirements"
                        name="requirements"
                        required
                        type="text"
                        placeholder="List the required skills, education, and experience"
                    />
                    <InputPair
                        label="Application URL"
                        description="Link where candidates can apply"
                        id="applicationUrl"
                        name="applicationUrl"
                        required
                        type="url"
                        placeholder="https://example.com/careers/apply"
                    />
                    <Button type={"submit"} className={"w-full"} size={"lg"}>Post Job</Button>
                </div>

                {/* Right side - company logo */}
                <div className={"space-y-2"}>
                    <Label htmlFor={"companyLogo"} className={"items-start flex flex-col gap-1"}>
                        <div className={"size-40 rounded-xl shadow-xl overflow-hidden mb-5"}>
                            {companyLogo ? (
                                <img
                                    src={companyLogo} className={"object-cover w-full h-full"} alt={"Company Logo"}/>
                            ) : null}
                        </div>
                        Company Logo
                        <small className={"text-muted-foreground"}>
                            Upload your company logo (optional)
                        </small>
                    </Label>
                    <Input
                        id={"companyLogo"}
                        type={"file"}
                        className={"w-1/2"}
                        onChange={onChange}
                        name={"companyLogo"}
                    />
                </div>

            </Form>
        </div>
    )
}