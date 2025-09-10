import type { Route } from "./+types/jobs-page";
import { Button } from "~/common/components/ui/button";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import JobCard from "~/features/jobs/components/job-card";
import PageHeader from "~/common/components/page-header";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "~/features/jobs/constants/constants";
import { DateTime } from "luxon";
import { getJobs } from "~/features/jobs/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Jobs | wemake" },
        { name: "description", content: "Find your dream job at wemake" },
    ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {

    const { client } = makeSSRClient(request);
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const location = url.searchParams.get("location");
    const salary = url.searchParams.get("salary");

    const jobs = await getJobs(client,{
        limit: 60,
        jobType: type as "full-time" | "part-time" | "freelance" | "internship" | undefined,
        jobLocation: location as "remote" | "in-person" | "hybrid" | null | undefined,
        salaryRange: salary as "$0 - $50,000" | "$50,000 - $70,000" | "$70,000 - $100,000" | "$100,000 - $120,000" | "$120,000 - $150,000" | "$150,000 - $250,000" | "$250,000+" | undefined,
    });

    return { jobs };
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
    const hoverCSS = "hover:bg-red-600 hover:text-white bg-red-600 text-white";

    // ✅ 파라미터 제어하는 방식
    const [searchParams, setSearchParams] = useSearchParams();
    const onFilterClick = (key: string, value: string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    };
    const clearFilter = (key: string) => {
        if (searchParams.has(key)) {
            searchParams.delete(key);
            setSearchParams(searchParams);
        }
    };
    const clearAll = () => {
        ["type", "location", "salary"].forEach((k) => searchParams.delete(k));
        setSearchParams(searchParams);
    };

    const hasType = !!searchParams.get("type");
    const hasLocation = !!searchParams.get("location");
    const hasSalary = !!searchParams.get("salary");
    const hasAny = hasType || hasLocation || hasSalary;

    return (
        <div className="space-y-20">
            <PageHeader title="Jobs" description="Companies looking for makers"/>
            <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 col-span-4 gap-5">
                    {loaderData.jobs.map((job) => (
                        <JobCard
                            key={job.job_id}
                            jobId={job.job_id}
                            companyName={job.company_name}
                            companyLogoSrc={job.company_logo_url}
                            companyHQ={job.company_location}
                            title={job.position}
                            timeAgo={DateTime.fromISO(job.create_at).toRelative()!}
                            jobType={job.job_types}
                            positionLocation={job.job_location}
                            salary={job.salary_range}
                        />
                    ))}
                </div>
                <div className="col-span-2 flex flex-col sticky top-20 gap-10 xl:col-span-2 pr-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">필터</h3>
                        { hasAny &&
                            <Button variant="default" size="sm" onClick={clearAll}>
                                전체 초기화
                            </Button>
                        }
                    </div>

                    <div className="flex flex-col items-start gap-2.5">
                        <div className="flex items-center justify-between w-full">
                            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
                            {hasType &&
                                <Button variant="default" size="sm" onClick={() => clearFilter("type")}>
                                    초기화
                                </Button>
                            }
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {JOB_TYPES.map((type) => (
                                <Button
                                    key={type.value}
                                    variant={"outline"}
                                    onClick={() => onFilterClick("type", type.value)}
                                    className={cn(
                                        type.value === searchParams.get("type")
                                            ? `${hoverCSS}`
                                            : ""
                                    )}
                                >
                                    {type.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2.5">
                        <div className="flex items-center justify-between w-full">
                            <h4 className="text-sm text-muted-foreground font-bold">
                                Location
                            </h4>
                            {hasLocation && (
                                <Button variant="default" size="sm" onClick={() => clearFilter("location")}>
                                    초기화
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {LOCATION_TYPES.map((type) => (
                                <Button
                                    key={type.value}
                                    variant={"outline"}
                                    onClick={() => onFilterClick("location", type.value)}
                                    className={cn(
                                        type.value === searchParams.get("location")
                                            ? `${hoverCSS}`
                                            : ""
                                    )}
                                >
                                    {type.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2.5">
                        <div className="flex items-center justify-between w-full">
                            <h4 className="text-sm text-muted-foreground font-bold">
                                Salary Range
                            </h4>
                            {hasSalary && (
                                <Button variant="default" size="sm" onClick={() => clearFilter("salary")}>
                                    초기화
                                </Button>
                            )}

                        </div>
                        <div className="flex flex-wrap gap-2">
                            {SALARY_RANGE.map((range) => (
                                <Button
                                    key={range}
                                    variant={"outline"}
                                    onClick={() => onFilterClick("salary", range)}
                                    className={cn(
                                        range === searchParams.get("salary") ? `${hoverCSS}` : ""
                                    )}
                                >
                                    {range}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}