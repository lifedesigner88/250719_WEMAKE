import type { Route } from "./+types/promote-page";
import PageHeader from "~/common/components/page-header";
import type { DateRange } from "react-day-picker";
import React from "react";
import { DateTime } from "luxon";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { Calendar } from "~/common/components/ui/calendar";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
    return [
        { title:"promote | wemake" },
        { name:"discription", content:"Promote your product" }
    ]
}

export default function PromotePage() {

    const [promotionPeriod, setPromotionPeriod] = React.useState<DateRange | undefined>();

    const totalDays = promotionPeriod?.from && promotionPeriod?.to ?
        DateTime.fromJSDate(promotionPeriod.to).diff(
            DateTime.fromJSDate(promotionPeriod.from), "days").days + 1 : 0;

    return (
        <div className={"flex flex-col items-center"}>
            <PageHeader title={"Promote Your Product"} description={"Boost your product's visibility "}/>
            <Form className={"flex flex-col gap-10 items-center w-1/3"}>
                <SelectPair
                    label={"Select a Product"}
                    description={"Select a product to promote"}
                    name={"product"}
                    required={true}
                    placeholder={"Select a product"}
                    options={[
                        { label:"Web Development", value:"web-development" },
                        { label:"Mobile Development", value:"mobile-development" },
                        { label:"Design", value:"design" },
                        { label:"Data Science", value:"data-science" },
                        { label:"Machine Learning", value:"machine-learning" },
                    ]}/>
                <div>
                    <Label className={"flex flex-col gap-1"}>
                        Seletet a range of dates for prometion{""}
                        <small className={"text-muted-foreground"}>
                            Minimum duration is 3 days.
                        </small>
                    </Label>
                    <Calendar
                        mode={"range"}
                        selected={promotionPeriod}
                        onSelect={setPromotionPeriod}
                        min={3}
                        disabled={{ before:new Date() }}
                    />
                </div>
                <Button disabled={totalDays === 0} type={"submit"}>
                    Go to checkout ( ${totalDays * 20} )
                </Button>
            </Form>


        </div>
    );


}