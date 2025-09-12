import type { Route } from "./+types/promote-page";
import PageHeader from "~/common/components/page-header";
import type { DateRange } from "react-day-picker";
import React from "react";
import { DateTime } from "luxon";
import { Form } from "react-router";
import { useEffect } from "react";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { Calendar } from "~/common/components/ui/calendar";
import { Button } from "~/common/components/ui/button";
import { getProductForPromote } from "~/features/products/queries";
import { getUserIdForSever } from "~/features/auth/querys";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "promote | wemake" },
        { name: "discription", content: "Promote your product" }
    ]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
    const userId = await getUserIdForSever(request)
    const data = await getProductForPromote(userId)
    return { data, userId }
}

export const action = async ({ request }: Route.ActionArgs) => {

    const formData = await request.formData();
    const object = Object.fromEntries(formData);
    console.log(object)

}

export default function PromotePage({ loaderData }: Route.ComponentProps) {
    const { data, userId } = loaderData;

    const [promotionPeriod, setPromotionPeriod] = React.useState<DateRange | undefined>();

    const totalDays = promotionPeriod?.from && promotionPeriod?.to ?
        DateTime.fromJSDate(promotionPeriod.to).diff(
            DateTime.fromJSDate(promotionPeriod.from), "days").days + 1 : 0;

    useEffect(() => {
        const initToss = async () => {
            const toss = await loadTossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm")
            const widgets = toss.widgets({
                customerKey: userId
            })

            await widgets.setAmount({
                value: 10000,
                currency: "KRW"
            })

            await widgets.renderPaymentMethods({
                selector: "#toos-payment-methods",
            })
            await widgets.renderAgreement({
                selector: "#toos-payment-agreement",
            })
        };
        void initToss();
    }, []);

    return (
        <div className={"flex flex-col items-center"}>
            <PageHeader title={"Promote Your Product"} description={"Boost your product's visibility "}/>
            <div className={"px-20 grid grid-cols-6 w-full"}>
                <Form className={"col-span-4 w-full  flex flex-col gap-10 items-center"} method={"post"}>
                    <SelectPair
                        label={"Select a Product"}
                        description={"Select a product to promote"}
                        name={"product_id"}
                        required={true}
                        placeholder={"Select a product"}
                        options={data?.map((product) => ({
                                label: product.name,
                                value: `${product.product_id}`,
                            })
                        )}/>
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
                            disabled={{ before: new Date() }}
                        />
                    </div>
                    <Button disabled={totalDays === 0} type={"submit"}>
                        Go to checkout ( ${totalDays * 20} )
                    </Button>
                </Form>
                <aside className={"col-span-2 flex flex-col gap-10 items-center min-w-[400px]"}>
                    <div id={"toos-payment-methods"} className={"w-full"}></div>
                    <div id={"toos-payment-agreement"} className={"w-full"}></div>
                </aside>

            </div>


        </div>
    );


}