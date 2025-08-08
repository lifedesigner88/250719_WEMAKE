import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/job-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { DateTime } from "luxon";
import { data } from "react-router";
import { getJob } from "~/features/jobs/queries";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Job Details | wemake" }];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
    const jobId = Number(params.jobId);
    if (!jobId || Number.isNaN(jobId)) throw data(null, { status: 404 });
    const job = await getJob(jobId);
    return { job };
};

function csvToList(value: string) {
    return value.split(",").map((v) => v.trim()).filter(Boolean);
}

export default function JobPage({ loaderData }: Route.ComponentProps) {
    const { job } = loaderData;
    return (
        <div>
            <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
            <div className="grid grid-cols-6 -mt-20 gap-20 items-start">
                <div className="col-span-4 space-y-10">
                    <div>
                        <div className="size-40 bg-white rounded-full  overflow-hidden relative left-10">
                            <img
                                src={job.company_logo_url}
                                className="object-cover"
                                alt={"avatar"}
                            />
                        </div>
                        <h1 className="text-4xl font-bold">{job.position}</h1>
                        <h4 className="text-lg text-muted-foreground">{job.company_name}</h4>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant={"secondary"}>{job.job_types}</Badge>
                        <Badge variant={"secondary"}>{job.job_location}</Badge>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Overview</h4>
                        <p className="text-lg">{job.overview}</p>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Responsibilities</h4>
                        <ul className="text-lg list-disc list-inside">
                            {csvToList(job.responsibilities).map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Qualifications</h4>
                        <ul className="text-lg list-disc list-inside">
                            {csvToList(job.qualifications).map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Benefits</h4>
                        <ul className="text-lg list-disc list-inside">
                            {csvToList(job.benefits).map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Skills</h4>
                        <ul className="text-lg list-disc list-inside">
                            {csvToList(job.skills).map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-2 space-y-5 mt-32 sticky top-20 p-6 border rounded-lg">
                    <div className="flex flex-col">
                        <span className=" text-sm text-muted-foreground">Avg. Salary</span>
                        <span className="text-2xl font-medium">{job.salary_range}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className=" text-sm text-muted-foreground">Location</span>
                        <span className="text-2xl font-medium">{job.job_location}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className=" text-sm text-muted-foreground">Type</span>
                        <span className="text-2xl font-medium">{job.job_types}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className=" text-sm text-muted-foreground">
                            Posted {DateTime.fromISO(job.create_at).toRelative()!}
                        </span>
                        <DotIcon className="size-4" />
                        <span className=" text-sm text-muted-foreground">{job.company_location}</span>
                    </div>
                    <a href={job.apply_url} target="_blank" rel="noreferrer">
                        <Button className="w-full">Apply Now</Button>
                    </a>
                </div>
            </div>
        </div>
    );
}