import type { Route } from "./+types/jobs-page";
import { Button } from "~/common/components/ui/button";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import JobCard from "~/features/jobs/components/job-card";
import PageHeader from "~/common/components/page-header";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "~/features/jobs/constants/constants";

export const meta: Route.MetaFunction = () => {
    return [
        { title:"Jobs | wemake" },
        { name:"description", content:"Find your dream job at wemake" },
    ];
};

export default function JobsPage() {
    const hoverCSS = "hover:bg-red-600 hover:text-white bg-red-600 text-white"

    // ✅ 파라미터 제어하는 방식
    const [searchParams, setSearchParams] = useSearchParams();
    const onFilterClick = (key: string, value: string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    };
    return (
        <div className="space-y-20">
            <PageHeader title="Jobs" description="Companies looking for makers"/>
            <div className="grid grid-cols-6 gap-20 items-start">
                <div className="grid grid-cols-3 col-span-4 gap-5">
                    {Array.from({ length:11 }).map((_, index) => (
                        <JobCard
                            key={`jobId-${index}`}
                            jobId={`jobId-${index}`}
                            companyName="Tesla"
                            companyLogoSrc="https://github.com/facebook.png"
                            companyHQ="San Francisco, CA"
                            title="Software Engineer"
                            timeAgo="12 hours ago"
                            jobType="Full-time"
                            positionLocation="Remote"
                            salary="$100,000 - $120,000"
                        />
                    ))}
                </div>
                <div className="col-span-2 flex flex-col gap-10">
                    <div className="flex flex-col items-start gap-2.5">
                        <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
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
                        <h4 className="text-sm text-muted-foreground font-bold">
                            Location
                        </h4>
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
                        <h4 className="text-sm text-muted-foreground font-bold">
                            Salary Range
                        </h4>
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