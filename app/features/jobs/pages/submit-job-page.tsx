import type { Route } from "./+types/submit-job-page";
import { Form, data, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import PageHeader from "~/common/components/page-header";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "~/features/jobs/constants/constants";
import { createJob, type JobInsert } from "~/features/jobs/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Post a Job | wemake" },
        {
            name: "description",
            content: "Reach out to the best developers in the world",
        },
    ];
};

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const { client } = makeSSRClient(request);

    const required = [
        "position", "overview", "responsibilities", "qualifications", "benefits", "skills",
        "companyName", "companyLogoUrl", "companyLocation", "applyUrl", "jobType", "jobLocation", "salaryRange"
    ];
    for (const key of required) {
        const v = formData.get(key);
        if (!v || typeof v !== "string" || v.trim().length === 0)
            throw data({ error: `${key} is required` }, { status: 400 });
    }

    const payload = {
        position: formData.get("position") as string,
        overview: formData.get("overview") as string,
        responsibilities: formData.get("responsibilities") as string,
        qualifications: formData.get("qualifications") as string,
        benefits: formData.get("benefits") as string,
        skills: formData.get("skills") as string,
        company_name: formData.get("companyName") as string,
        company_logo_url: formData.get("companyLogoUrl") as string,
        company_location: formData.get("companyLocation") as string,
        apply_url: formData.get("applyUrl") as string,
        job_types: formData.get("jobType") as string,
        job_location: formData.get("jobLocation") as string,
        salary_range: formData.get("salaryRange") as string,
    } as JobInsert;

    const job = await createJob(client, payload);
    return redirect(`/jobs/${job.job_id}`);
};

export default function SubmitJobPage() {
    return (
        <div>
            <PageHeader
                title="Post a Job"
                description="Reach out to the best developers in the world"
            />
            <Form method="post" className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
                <div className="grid grid-cols-3 w-full gap-10">
                    <InputPair
                        label="Position"
                        description="(40 characters max)"
                        name="position"
                        maxLength={40}
                        type="text"
                        id="position"
                        required
                        placeholder="i.e Senior React Developer"
                    />
                    <InputPair
                        id="overview"
                        label="Overview"
                        description="(400 characters max)"
                        name="overview"
                        maxLength={400}
                        type="text"
                        required
                        placeholder="i.e We are looking for a Senior React Developer"
                        textArea
                    />
                    <InputPair
                        id="responsibilities"
                        label="Responsibilities"
                        description="(400 characters max, comma separated)"
                        name="responsibilities"
                        maxLength={400}
                        type="text"
                        required
                        placeholder="i.e Implement new features, Maintain code quality, etc."
                        textArea
                    />
                    <InputPair
                        id="qualifications"
                        label="Qualifications"
                        description="(400 characters max, comma separated)"
                        name="qualifications"
                        maxLength={400}
                        type="text"
                        required
                        placeholder="i.e 3+ years of experience, Strong TypeScript skills, etc."
                        textArea
                    />
                    <InputPair
                        id="benefits"
                        label="Benefits"
                        description="(400 characters max, comma separated)"
                        name="benefits"
                        maxLength={400}
                        type="text"
                        required
                        placeholder="i.e Flexible working hours, Health insurance, etc."
                        textArea
                    />
                    <InputPair
                        id="skills"
                        label="Skills"
                        description="(400 characters max, comma separated)"
                        name="skills"
                        maxLength={400}
                        type="text"
                        required
                        placeholder="i.e React, TypeScript, etc."
                        textArea
                    />
                    <InputPair
                        id="companyName"
                        label="Company Name"
                        description="(40 characters max)"
                        name="companyName"
                        maxLength={40}
                        type="text"
                        required
                        placeholder="i.e wemake"
                    />
                    <InputPair
                        id="companyLogoUrl"
                        label="Company Logo URL"
                        description="(40 characters max)"
                        name="companyLogoUrl"
                        type="url"
                        required
                        placeholder="i.e https://wemake.services/logo.png"
                    />
                    <InputPair
                        id="companyLocation"
                        label="Company Location"
                        description="(40 characters max)"
                        name="companyLocation"
                        maxLength={40}
                        type="text"
                        required
                        placeholder="i.e Remote, New York, etc."
                    />
                    <InputPair
                        id="applyUrl"
                        label="Apply URL"
                        description="(40 characters max)"
                        name="applyUrl"
                        maxLength={40}
                        type="url"
                        required
                        placeholder="i.e https://wemake.services/apply"
                    />
                    <SelectPair
                        label="Job Type"
                        description="Select the type of job"
                        name="jobType"
                        required
                        placeholder="Select the type of job"
                        options={JOB_TYPES.map((type) => ({
                            label: type.label,
                            value: type.value,
                        }))}
                    />
                    <SelectPair
                        label="Job Location"
                        description="Select the location of the job"
                        name="jobLocation"
                        required
                        placeholder="Select the location of the job"
                        options={LOCATION_TYPES.map((location) => ({
                            label: location.label,
                            value: location.value,
                        }))}
                    />
                    <SelectPair
                        label="Salary Range"
                        description="Select the salary range of the job"
                        name="salaryRange"
                        required
                        placeholder="Select the salary range of the job"
                        options={SALARY_RANGE.map((salary) => ({
                            label: salary,
                            value: salary,
                        }))}
                    />
                </div>
                <Button type="submit" className="w-full max-w-sm" size="lg">
                    Post job for $100
                </Button>
            </Form>
        </div>
    );
}